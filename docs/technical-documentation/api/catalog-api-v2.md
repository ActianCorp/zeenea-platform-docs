# Catalog API v2

Actian Data Intelligence offers a GraphQL API for integrating the data catalog into your data ecosystem. With this API, you can query or mutate the metadata stored in the data catalog.

Full documentation of this API is available at [GraphQL Catalog API](https://docs.zeenea.com/).
 
Actian Data Intelligence also makes available the GraphiQL tool, enabling you to test your queries from the browser, at a URL such as the following:

`https://[instance-name].zeenea.app/api/catalog`

where `[instance-name]` is the name of your instance.

GraphQL is the GraphQL integrated development environment (IDE). It provides syntax highlighting and auto-completion, making it easy to get to grips with GraphQL syntax and discover the API.

Access to GraphQL is restricted to catalog users, and the permissions applied are those of your user in Explorer and Studio. It does not require any API key.

## Permissions

The recommended permission scope for the Catalog API v2 is **Manage documentation** or **Read-only**.