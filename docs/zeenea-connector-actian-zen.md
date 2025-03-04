---
title: Actian Zen
---
# Adding an Actian Zen Connection

## Prerequisites
* The current Scanner version requires Java 11. Either OpenJDK or Oracle JDK can be installed.
* It is assumed that the Zeenea Scanner has been successfully downloaded and configured. See [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Step 1: Install the Generic JDBC Connector Plugin

1. Download the Generic JDBC connector plugin from the [Zeenea Connector Downloads](./zeenea-connectors-list.md), or download directly at https://plugins.zeenea.app/jdbc-connector-plugin/jdbc-connector-plugin-74.zip.
2. Move the zip file to the `[scanner_install_dir]/plugins` folder. **Do not unzip the archive**.

## Step 2: Install Actian Zen Drivers

1. Download Actian Zen Drivers from [Actian ESD](https://esd.actian.com/product/Zen_PSQL). Select **Actian Zen (PSQL)** in the **PRODUCT** dropdown and select **SDKs** in the **PLATFORM** dropdown.
2. Extract the following four files from the `bin` folder of the zip file and copy them to the `[scanner_install_dir]/lib-ext` folder:
   
      * `jpscs.jar`
      * `pvjdbc2.jar`
      * `pvjdbc2x.jar`
      * `pvjdbc2.dll`

## Step 3: Create the Configuration File

1. In the `[scanner_install_dir]/connections` folder, create a new file named `zen-psql.conf`. (The file can be named as desired, but the file extension must be `.conf`.)
2. Copy and modify the content below based on your environment configuration, replacing `<HOST-NAME>`, `<USER>`, and `<PASSWORD>` with the appropriate values for your environment.
   
     ```
     # Customizable values for code and name
     code = "dev-psql-dl"
     name = "psql-dev-dl"

     # Connector ID (do not change)
     connector_id = "generic-jdbc"
     enabled = true

     connection {
          # JDBC URL to connect to the Zen PSQL database
          url = "jdbc:pervasive://<HOST-NAME>:1583/<mydatabase>"
          jdbc_driver_name = "com.pervasive.jdbc.v2.Driver"
          # Authentication details (modify as per environment)
          # Default password is an empty string
          username = "<USER>"
          password = "<PASSWORD>"
     }
     ```
## Step 4: Verify the Connection

1. Restart Zeenea Scanner.
2. In Zeenea Administration, click **Connections** and verify that the new connection is listed:

     ![](/img/zeenea-connection-added-zen.png)
3. If you encounter any issues, review the scanner.log file located in the `[scanner_install_dir]/logs` folder for troubleshooting guidance. Also refer to [Troubleshooting for Scanners and Connections](./zeenea-troubleshooting.md).
