# Managing API Keys

Zeenea provides a **machine-to-machine** authentication mechanism based on API keys. This key must be generated from the administration interface on your platform.

## Create an API key

1. Login to Zeenea as a user with the "Connectivity Administration" permission.
2. Open Zeenea Administration.
3. Go to the **API Keys** section.
4. Click the **Create API Key** button.<br />A **Create API key** window opens. 
5. In the **Name** field, enter a unique name for your API key. <br />This name helps you identify the key in the interface later.
6. Choose a **Permission scope** for the API key:
   * **Read-only**: Allows read permission on all catalog items.
   * **Manage documentation**: Allows read and write permissions on all catalog items (create, update, delete).
   * **Admin**: Allows read and write permissions on catalog items, users, and the metamodel.
   * **Scanner**: Allows permission for use in scanners.
   * **Access request**: Allows permission to use the Access Request API.
7. Select an expiration date for the API key.
8. Click **Create API key** button. <br />Your new API key is generated.
9. Copy the API key and store it in a secure location.

> **Important:** The API key is displayed only once and cannot be retrieved later.
 
## Delete an API key

You can delete an existing API key at any time from the **API Key** section in the administration interface.

> **Important:** Be careful when deleting the API key, because the services (script, scanners, or others) that use this key for authentication will no longer be able to connect to the Zeenea platform.
