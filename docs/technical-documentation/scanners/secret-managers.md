# Secret Managers

The scanner can retrieve connection credentials from a secret manager instead of storing them in plain text in connection files.

This page describes the supported secret managers, how to configure them, and the permissions required on the secret manager side.

!!! warning
    Values such as `<APP_ID>` or `<VAULT_HOST>` are placeholders. Never include real passwords, tokens, or keys in shared configuration files. Instead, pass sensitive values through environment variables (for example, `${?MY_VAR}`).

## How It Works

A secret manager configuration has two parts:

1. **Scanner-level configuration**: One secret manager for the whole scanner, declared in the scanner's `application.conf`.
2. **Connection-level configuration**: A reference in each connection file that specifies the secret to read (`secret_manager.key`) and the fields to substitute (`${secret_manager.<field>}`).

### Scanner-Level Configuration

Configure a single secret manager for the scanner in `application.conf`:

```hocon
secret-manager {
  provider = "<PROVIDER>"      # see section 2.1
  configuration {              # provider settings (sections 2.3 to 2.9); flat keys, string values
    ...
  }
  proxy {                      # optional; see section 2.2.3
    ...
  }
  key = "scanner"              # optional: the secret used for substitutions in application.conf itself (default "scanner")
}
```

!!! warning "One Secret Manager per Scanner"
    Only one secret manager can be configured per scanner.

* If no `secret-manager` block is configured, no secret manager is used. The log shows `secret_manager_not_in_use`.
* Keep the values in `configuration` as quoted strings, including numbers. For example, `timeout-seconds = "30"`.
* The scanner creates the provider at startup. A configuration error (such as a missing key, an unreadable keystore, or an `http://` URL) stops the scanner with a message that identifies the setting.

### Connection-Level Configuration

Configure each connection to use a secret from the secret manager:

```hocon
name = "postgres-prod"
code = "postgres-prod"
connector_id = "postgresql"

secret_manager {
  enabled = true
  key = "zeenea/postgres-prod"        # the secret to read; its format depends on the provider
}

connection {
  url      = "jdbc:postgresql://db.example:5432/app"
  username = ${secret_manager.username}   # a field of the secret
  password = ${secret_manager.password}

  # Optional field with a default value: kept when the secret has no "schema" field
  schema = "public"
  schema = ${?secret_manager.schema}
}
```

* `secret_manager.enabled` defaults to `false`.
* When `key` is missing, the scanner uses the connection `code` as the key and logs the warning `secret_manager_no_identifier_key_found`.
* A secret is a set of named **fields**. Each provider section describes the fields available in a secret (for example, `username` and `password` for a JSON secret).
* Use `${secret_manager.<field>}` for a required value, and `${?secret_manager.<field>}` for an optional one (standard HOCON syntax).
* When the secret or field cannot be found, the scanner logs `secret_manager_missing_secret` or `secret_manager_missing_key_value`. A required substitution cannot be resolved (`Could not resolve substitution to a value`), so the connection does not load.
* The scanner calls the secret manager for each substitution and caches nothing. As a result, a rotated password is picked up the next time the connection configuration is loaded.

## Providers

The scanner supports multiple secret manager providers.

### Choosing a Provider

Use the following table to compare the supported providers:

| Provider | Secret Store | Scanner Authentication | Network | Typical Use |
| --- | --- | --- | --- | --- |
| `file` | Local HOCON file | File permissions | None | Testing or when an external tool writes the file |
| `aws-secrets-manager` | AWS Secrets Manager | Access key, AWS profile, or the default AWS credential chain (for example, instance role) | AWS API | Scanner running on AWS |
| `hashicorp-vault` | HashiCorp Vault or OpenBao (KV v1/v2) | Token, AppRole, Kubernetes, or TLS certificate | HTTPS to Vault | HashiCorp  Vault or OpenBao users |
| `gcp-secret-manager` | Google Cloud Secret Manager | Service account key or the metadata server (GCE, GKE, Cloud Run) | HTTPS to Google Cloud | Scanner running on GCP |

!!! tip "Recommended Authentication Methods"
    Prefer an authentication method that does not store long-lived secrets on the scanner host. Examples include the GCP metadata server, AWS instance roles, and Vault Kubernetes authentication.

### Common Settings for HTTP Providers

The following settings apply to `hashicorp-vault` and `gcp-secret-manager`.

#### Timeouts and Retries

| Setting | Default | Description |
| --- | --- | --- |
| `timeout-seconds` | `"30"` | Connection and response timeout for each request. |
| `max-retries` | `"2"` | Number of retries after a 5xx response or a network error, including timeouts. Retries use exponential backoff (200 ms, 400 ms, 800 ms, and so on). |

The scanner does not retry 4xx responses or TLS errors because they indicate a configuration or permission problem.

#### TLS

* Only `https://` URLs are accepted. The exception is `hashicorp-vault`, which also accepts `http://` URLs on `localhost`, `127.x.x.x`, or `[::1]` for local development and logs the warning `secret_manager_insecure_url`.
* The server certificate and host name are always verified.
* By default, the JVM's trusted certificates (cacerts) are used. For a private CA or a TLS-inspecting proxy, provide a truststore:

| Setting | Default | Description |
| --- | --- | --- |
| `truststore-path` | — | Path to the truststore that contains the CA certificates to trust. |
| `truststore-password` | Empty |  Password for the truststore file.  |
| `truststore-type` | `PKCS12` | Type of the truststore file.<br />Possible values are `PKCS12` or `JKS`.  |

#### Proxy

```hocon
secret-manager {
  ...
  proxy {
    hostname = "proxy.example"
    port     = "3128"
    scheme   = "http"                     # default "http"
    username = "<PROXY_USER>"             # optional
    password = ${?SCANNER_PROXY_PASSWORD} # optional
  }
}
```

* `hostname` and `port` are required. If either is missing, the warning `<provider>_proxy_error` is logged and no proxy is used.
* Basic proxy authentication is supported, including for HTTPS tunnels.
* `aws-secrets-manager` uses the same block but requires all five settings. For more information, see [AWS Secrets Manager](#aws-secrets-manager).
* `file` makes no network calls, so it ignores the proxy.
* Providers that do not make network calls, such as `file`, ignore the proxy configuration.

!!! note
    The proxy path is not covered by automated tests. Validate the configuration in your environment before deploying to production.

### Local File

`provider = "file"`

Reads secrets from a local HOCON file.

#### Configuration

```hocon
secret-manager {
  provider = "file"
  configuration {
    file-path = "/etc/zeenea/secrets.conf"
  }
}
```

#### Keys and Fields

In the secret file, the first path segment is the secret key, and the remaining path segments are the field name. Values must be strings. Substitutions are resolved, so `${?ENV_VAR}` works.

```hocon
postgres-prod {
  username = "USER_NAME"
  password = ${?POSTGRES_PASSWORD}
}
```

* **Key:** `postgres-prod`.
* **Fields:** `username`, `password`.

#### Setup on the Host Side

Protect the file with `chmod 600` and ensure it is owned by the scanner's service user.

### AWS Secrets Manager

`provider = "aws-secrets-manager"`

Reads secrets from AWS Secrets Manager through the AWS SDK.

#### Configuration

```hocon
secret-manager {
  provider = "aws-secrets-manager"
  configuration {
    region            = "eu-west-3"             # optional: default AWS region chain
    profile           = "zeenea"                # optional: named profile from ~/.aws
    access_key_id     = ${?AWS_ACCESS_KEY_ID}   # optional, together with secret_access_key
    secret_access_key = ${?AWS_SECRET_ACCESS_KEY}
  }
}
```

* Unlike the other providers, this provider uses underscores in setting names, such as `access_key_id`.
* The proxy requires `hostname`, `port`, `scheme`, `username`, and `password`. If any setting is missing, no proxy is used.

#### Authentication

The scanner selects credentials in this order: `access_key_id` and `secret_access_key`, then `profile`, then the default AWS credentials chain (environment variables, instance role, ECS or EKS role, and other sources).

On AWS, we recommend using an instance role or a pod role.

#### Keys and Fields

* **Key**: The secret name or ARN.
* **Secret value**: A JSON object whose values are all **strings**, for example, `{"username": "USER_NAME", "password": "..."}`. Other value types cause parsing to fail with `aws_secret_manager_parse_error`.
* **Fields**: The keys of the JSON object.

#### Setup on the AWS Side

**IAM permissions**: `secretsmanager:GetSecretValue` on the secrets, plus `kms:Decrypt` if they are encrypted with a customer-managed KMS key.

Grant the IAM permission `secretsmanager:GetSecretValue` on the secrets. If the secrets use a customer-managed KMS key, also grant `kms:Decrypt`.

### HashiCorp Vault and OpenBao

`provider = "hashicorp-vault"`

Reads secrets from a KV v1 or KV v2 secrets engine.

The same provider works with **OpenBao**. Use the OpenBao URL and the same settings. 

Compatibility has been verified with OpenBao 2.7.0 using token and AppRole authentication with KV v2. However, OpenBao does not guarantee API compatibility with Vault.

#### Configuration

```hocon
secret-manager {
  provider = "hashicorp-vault"
  configuration {
    url         = "https://<VAULT_HOST>:8200"   # required; http only on localhost
    namespace   = "<NAMESPACE>"                 # optional (Vault Enterprise / HCP / OpenBao namespaces)
    mount       = "secret"                      # default: KV mount path
    kv-version  = "2"                           # default; "1" for KV v1
    auth-method = "approle"                     # required: token | approle | kubernetes | cert
    auth-mount  = "approle"                     # optional: defaults to the method name
    # ...authentication settings, see below
    truststore-path = "/etc/zeenea/vault-ca.p12"   # optional, section 2.2.2
    timeout-seconds = "30"
    max-retries     = "2"
  }
  proxy { ... }   # optional
}
```

#### Authentication

| `auth-method` | Settings | Description |
| --- | --- | --- |
| `token` | `token` (required) | A static token,  for example `token = ${?VAULT_TOKEN}`. It is not renewed, so use a periodic token or prefer another method. |
| `approle` | `role-id` and `secret-id` (required) | Logs in to `auth/<auth-mount>/login`. Pass `secret-id` through an environment variable. |

* **Login token:** With `approle` authentication, the scanner reuses the token until 90% of its lease has elapsed and then performs a new login to obtain a new token. After a 403 response, the scanner logs in again and retries the request once.

#### Keys and Fields

* **Key**: The secret path within the mount, for example, `zeenea/postgres-prod`. The scanner refuses a key that is empty, starts with `/`, or has an empty or `..` segment.
* **Fields**: The top-level keys of the secret. Numbers and booleans are converted to text. Nested objects and lists are ignored with `vault_ignored_values` warning.

#### Behavior

* **Reading:** KV v2 reads `GET /v1/<mount>/data/<key>` (latest version). KV v1 reads `GET /v1/<mount>/<key>`.
* **Missing secret:** A `404` response indicates that the secret does not exist.

#### Setup on the Vault or OpenBao Side

The following example uses KV v2 mounted at `secret/`.

```hcl
# Policy "zeenea-read": read-only access to the scanner's secrets
path "secret/data/zeenea/*" {
  capabilities = ["read"]
}
```

```sh
vault policy write zeenea-read zeenea-read.hcl                    # OpenBao: bao policy write ...
vault write auth/approle/role/zeenea token_policies=zeenea-read token_ttl=1h
vault read  auth/approle/role/zeenea/role-id                      # -> role-id
vault write -f auth/approle/role/zeenea/secret-id                 # -> secret-id
vault kv put secret/zeenea/postgres-prod username=USER_NAME password=...
```

For KV v1, the policy path does not include the `data/` segment (for example, `path "secret/zeenea/*"`).

### Google Cloud Secret Manager

`provider = "gcp-secret-manager"`

Reads a secret version from Google Cloud Secret Manager through its REST API.

#### Configuration

```hocon
secret-manager {
  provider = "gcp-secret-manager"
  configuration {
    project          = "<PROJECT_ID>"               # required unless keys are full resource names
    auth-method      = "application-default"        # default | service-account-key | metadata
    credentials-path = "/etc/zeenea/gcp-sa.json"    # service-account-key (required); application-default (optional)
    truststore-path  = "..."                        # optional, e.g. for a TLS-inspecting proxy
    timeout-seconds  = "30"
    max-retries      = "2"
  }
  proxy { ... }   # optional
}
```

#### Authentication

| `auth-method` | How it works |
| --- | --- |
| `application-default` (default) | Uses `credentials-path` if specified, otherwise the `GOOGLE_APPLICATION_CREDENTIALS` environment variable, and finally the metadata server. This follows [Google's Application Default Credentials order](https://docs.cloud.google.com/docs/authentication/application-default-credentials), except that the gcloud user credentials file is not supported. |
| `service-account-key` | Uses a service account JSON key file specified by `credentials-path`. |

Only `service_account` key files are supported. `authorized_user` (gcloud user credentials), `external_account` (Workload Identity Federation), and impersonation files are rejected at startup with a clear error message.

#### Keys and Fields

| Key | Reads |
| --- | --- |
| `zeenea-postgres` | The latest version, in `project`. |
| `zeenea-postgres/versions/3` | Version 3 (a version alias also works). |
| `projects/<PROJECT>/secrets/zeenea-postgres/versions/latest` | A full resource name, in any project. |

Secret IDs and versions can contain only letters, digits, hyphens (`-`), and underscores (`_`).

* If a secret value is a **JSON object**, its top-level keys are returned as fields. Numbers and booleans are converted to text, and nested values are ignored.
* Any other value (for example, a plain password) is returned as a single field named **value**.
* The payload checksum (CRC32C) is verified.

#### Setup on the GCP Side

```sh
gcloud secrets create zeenea-postgres --data-file=secret.json      # {"username": "...", "password": "..."}
gcloud secrets add-iam-policy-binding zeenea-postgres \
  --member="serviceAccount:<SCANNER_SA>@<PROJECT>.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

To follow the principle of least privilege, grant the role on each secret rather than on the entire project.

## Security Recommendations

* **Least privilege:** Give the scanner's identity read-only access to the secrets it needs, and nothing else. For example, use a Vault policy on a single path prefix, or per-secret IAM on GCP.

* **Avoid long-lived secrets on disk when possible:**
   * AWS: Use an instance role or pod role.
   * GCP: Use the metadata server.
   * Vault: Use Kubernetes authentication.

* **When a bootstrap secret is unavoidable** (for example, an AppRole `secret-id` or a keystore password):
   * Pass it through an environment variable (`${?VAR}`) rather than storing it as plain text in `application.conf`.
   * Restrict the key and keystore files to the scanner's service user using `chmod 600`.
   * Rotate secrets regularly.

* **Dedicated service account:** Run the scanner under its own OS user, which the file permissions rely on.

* **TLS:** Keep the default certificate verification enabled. Add your CA to a truststore rather than disabling verification. The scanner does not provide an option to disable these checks.

* **Audit:** Monitor the secret manager's access logs for the scanner's identity (for example, Vault audit logs, AWS CloudTrail, or Google Cloud Audit Logs).

* **Logs:** The scanner never logs secret values, tokens, or private keys. It logs keys (secret names or queries), status codes, and the error messages of the provider.

## Troubleshooting

Log events start with a provider-specific prefix:

| Provider | Prefix |
| --- | --- |
| `aws-secrets-manager` | `aws_secret_manager_` |
| `hashicorp-vault` | `vault_` |
| `gcp-secret-manager` | `gcp_secret_manager_` |


| Symptom or Log | Likely Cause | Check or Fix |
| --- | --- | --- |
| The scanner does not start: `Unknown secret manager provider` | Typo in `provider` | Use one of the supported provider values listed in [Choosing a Provider](#choosing-a-provider). |
| The scanner does not start: `Key not found: '<setting>'` or `Invalid '<setting>'` | A required setting is missing or invalid | The error message identifies the setting. See the corresponding provider section. |
| `Invalid 'url': ... must be an https URL` | An `http://` URL | Use `https://`. Only Vault accepts `http://localhost` for development. |
| `Unable to load the ... keystore/truststore` | Incorrect path, password, or type | Test the file with `keytool -list -keystore <file> -storetype PKCS12`. The file must be readable by the scanner user. |
| `secret_manager_missing_secret` | The secret was not found, or access was denied | Check the provider's preceding `*_read_error` log event. A `404` error indicates an incorrect key or mount, while a `403` error indicates insufficient permissions. |
| `secret_manager_missing_key_value` | The secret exists but does not contain the requested field | Check the field names defined in the corresponding provider section (for example, `value` for a non-JSON GCP secret). |
| `vault_login_error`, `gcp_secret_manager_token_error` | Authentication failed | Check the credentials and the role. The error message of the provider is included. |
| `*_read_error` with an SSL/TLS message | The server certificate is not trusted, or the host name does not match | Configure `truststore-path` with the appropriate CA certificate and use the host name specified in the certificate. |
| `*_ignored_values` | The secret contains nested JSON values | Only top-level text, number, and boolean values are used. Flatten the secret structure. |
| `*_proxy_error` | An incomplete `proxy` block | See [Proxy](#proxy). |
| Timeouts | A network or proxy issue | Test connectivity with `curl` from the scanner host using the same proxy configuration. Increase `timeout-seconds` if needed. |

