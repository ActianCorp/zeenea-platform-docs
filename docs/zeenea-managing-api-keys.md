---
title: Managing API Keys
---

# Managing API Keys

Zeenea offers a "machine-to-machine" authentication mechanism based on API keys. This key must be generated from the administration interface on your platform.

# Create an API key

1. Login to Zeenea as a user with the "Connectivity Administration" permission.
2. Go to the Administration interface.
3. Select the **API Keys** section.
4. Click the **New API Key** button.
5. Give a name to your API key. The name will help you later identify the key in the interface.
6. Choose the permission scope of the API key:
   * **Read-only**: allows read access on all catalog items
   * **Manage documentation**: allows read and write permission on all catalog items (create, update, delete)
   * **Admin**: allows full permission on the catalog content (includes user and metamodel management)
   * **Scanner**: if you wish to use the key for a scanner set up
7. Select an expiration date.
8. Click **Create**.
9. Your new key is now ready to be copy pasted with the correct format. 

    :::caution[IMPORTANT]
    When creating an API key, make sure to write down the secret key as it will only be visible at that moment.
    :::
 
## Delete an API key

You can delete an existing API key at any time from the **API Key** section in the administration interface.

    :::caution[IMPORTANT]
    Be careful when deleting the API key, because the services (script, scanners, or others) that use this key for authentication will no longer be able to connect to the Zeenea platform.
    :::
 