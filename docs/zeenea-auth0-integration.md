---
title: Integration with Auth0
---

# Integration with Auth0

:::note
Information required for this integration may be provided by both Zeenea and the Customer.  
:::

Click [here](https://auth0.com/docs/connections/enterprise/saml) for more information.

## SAML

### Zeenea Credentials

* entityId: urn:auth0:zeenea-prod:CONNECTION
* Assertion Consumer Service URL: https://login.prod.zeenea.app/login/callback?connection=CONNECTION
* Certificate: Zeenea may provide the certificate (1) that will decrypt requests sent by Auth0 to the Identity Provider (hereafter called “IdP”).

As an alternative, you can use the following link for configuration purposes. It will let you download the metadata.xml configuration file to setup your Identity Provider:

https://login.prod.zeenea.app/samlp/metadata?connection=CONNECTION

:::note
In the example above, “CONNECTION” refers to the name of your Zeenea instance. This connection **MUST** have been created before requesting this resource otherwise, the metadata file won't be accessible.
:::

### Customer Credentials

<table>
  <tr>
    <th>Field</th>
    <th>Owner</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Connection Name</td>
    <td>Zeenea</td>
    <td>Name of the connection, set up by Zeenea. It represents your instance.</td>
  </tr>
  <tr>
    <td>Display Name</td>
    <td>The customer may suggest this.</td>
    <td>Display name of the login button (optional)</td>
  </tr>
  <tr>
    <td>Logo URL</td>
    <td>The customer may suggest this.</td>
    <td>Logo that will be displayed on the login button (optional). Dimensions: 20px x 20px.</td>
  </tr>
  <tr>
    <td>IdP domains</td>
    <td>Customer.<br /><br />Required if there are multiple domains.</td>
    <td>All domains, separated by a comma.</td>
  </tr>
  <tr>
    <td>Sign in URL</td>
    <td>Customer.<br /><br />Required. Must be given to Zeenea.</td>
    <td>Unique login URL for SAML</td>
  </tr>
  <tr>
    <td>X.509 Certificate</td>
    <td>Customer.<br /><br />Required. Must be given to Zeenea.</td>
    <td>Certificate (provided by the customer) to be uploaded.</td>
  </tr>
  <tr>
    <td>Sign Out URL</td>
    <td>Customer.<br /><br />Required. Must be given to Zeenea.</td>
    <td>Unique logout URL for SAML</td>
  </tr>
  <tr>
    <td>User ID Attribute</td>
    <td>Customer.<br /><br />Optional: only required if the mapping is not standard.</td>
    <td>Optional: to be mapped with Auth0’s “user_id” value</td>
  </tr>
  <tr>
    <td>Debug Mode</td>
    <td>Zeenea</td>
    <td>To be toggled on or off</td>
  </tr>
  <tr>
    <td>Sign Request</td>
    <td>Customer.<br /><br />Should the request be signed?</td>
    <td>When enabled, the SAML authentication request will be signed. Zeenea will then provide the customer with a decrypting certificate (1).</td>
  </tr>
  <tr>
    <td>Sign Algorithm</td>
    <td>Customer.<br /><br />SHA256 or SHA1</td>
    <td>Algorithm used by Auth0</td>
  </tr>
  <tr>
    <td>Sign Digest Algorithm</td>
    <td>Customer.<br /><br />Algorithm used by Auth0 for the digest</td>
    <td>Algorithm used by Auth0 for the digest</td>
  </tr>
  <tr>
    <td>Protocol Binding</td>
    <td>Customer.<br /><br />Algorithm used by Auth0 for the digest</td>
    <td>Binding HTTP to use with the IdP</td>
  </tr>
</table>

The signature of the assertions/tokens that prove the identity of a given end-user account managed by Auth0 relies on a self-signed certificate, of type x.509 v3, key size 2048 bits, created by Auth0, and not a certificate issued by a certification authority. This does not pose any security problem, because the trust relationship between the issuer of the assertions/tokens (Auth0) and the consumer (Zeenea's client) is manually configured. In addition, the self-signed certificate provided by Auth0 has a long lifetime (current certificate expires at the end of 2033), so from a lifetime perspective, there will be no need to frequently change the certificate.

Finally, you explicitly configure your IdP to trust the identity of users from this specific Auth0 certificate that you obtained from Zeenea and that was manually provided to you. So this trust happens to be based on a certificate, but the fact that this certificate is issued by a certificate authority would not add anything in terms of trust relationship.

The SAML response sent by the IdP to Auth0 must contain the email in one of the attributes. By default, the email is expected in an attribute named: 
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress

It can also be defined as an identifier in an attribute named: 
http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier

In any case, the attribute containing the email must be communicated to Zeenea; this will allow us to correct the setup (if needed), and to make sure that the information is correctly retrieved. 

### SAML Response Example:

```
http://www.w3.org/2000/09/xmldsig#"" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
[...]
  IssueInstant="2021-01-01T00:00:00Z" Version="2.0">
[...]
     
[...]
        
           http://www.w3.org/2001/XMLSchema"" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:type="xs:string">email@domain.com
        
[...]
```    

For more information on this integration, make sure to check out the official documentation: https://auth0.com/docs/connections/enterprise/saml

## Active Directory

Information regarding this integration is available on the official Auth0 website: https://auth0.com/docs/connections/enterprise/azure-active-directory/v2

 
## ADFS

Information regarding this integration is available on the official Auth0 website: 

https://auth0.com/docs/connections/enterprise/adfs

Parameters you should fill in Active Directory are:

* **Realm Identifier**: `urn:auth0:zeenea-prod`
* **Endpoint**: https://login.prod.zeenea.app/login/callback

## GSUITE

Information regarding this integration is available on the [official Auth0 website](https://auth0.com/docs/connections/enterprise/google-apps).

## Database

This kind of connection does not require any information from your end. It is set up entirely by Zeenea.