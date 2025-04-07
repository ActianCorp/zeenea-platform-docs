---
title: Actian DataConnect
---

# Adding an Actian DataConnect Connection

## Prerequisites

* Scanner **Version 76 or higher** is required to use DataConnect Connector.
* **Java 11** is required to run and build the DataConnect Connector.
* It is assumed that the Zeenea Scanner has been successfully downloaded and configured. See [Zeenea Scanner Setup](./zeenea-scanner-setup.md).

## Creating the Configuration File

1. In the `[scanner_install_dir]/connections` folder, create a new file named `dcconnector.conf`. (The file can be named as desired, but the file extension must be `.conf`.)
2. Copy and modify the content below based on your environment configuration:

     ```
     # code and name can be anything
     code = "actian-dataconnect-connector-id"
     name = "actian-dataconnect-connector-name"

     # Connector ID (do not change)
     connector_id = "actian-dataconnect"
     enabled = true
     
     # directories to be scanned (comma separated)
     scan_directories = "/path/to/maps/one,/path/to/maps/two"
     ```

3. List one of more directories you want scanned in the `scan_directories` property. It is comma-separated. The connector will only focus on `.map` and `.map.rtc` files. Other files and folders will be ignored.

## Installing the Plugin

You can download the plugin here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).
 
## Verifying the Connection

1. Restart Zeenea Scanner.
2. In Zeenea Administration, click **Connections** and verify that the new connection is listed.
3. If you encounter any issues, review the scanner.log file located in the `[scanner_install_dir]/logs` folder for troubleshooting guidance. Also refer to [Troubleshooting for Scanners and Connections](./zeenea-troubleshooting.md).

## Viewing the Dataset
 
1. Switch to Zeenea Studio by clicking the apps icon in the upper right and selecting **Studio**:

     ![](/img/zeenea-studio1.png)
2.  In Zeenea Studio, click **Catalog** to view the scanned map files:

     ![](/img/zeenea-studio-dataconnect.png)

## Manually Syncing the Connection

1. In Zeenea Administration, click **Connections**, then click the ellipsis button in the **Actions** column for your connection and click **Synchronize**:

     ![](/img/zeenea-connection-dataconnect.png)
