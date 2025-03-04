---
title: Zeenea Scanner Setup
---
# Zeenea Scanner Setup

## Prerequisites
* The current Scanner version requires Java 11. Either OpenJDK or Oracle JDK can be installed.

## Step 1: Install the Scanner

1. In Zeenea Studio, click the apps icon in the upper right and select **Administration**:

     ![](/img/zeenea-administration.png)
   
   <font color="red">
   * Zeenea docs: [https://support.zeenea.com/hc/en-001/articles/21059970696721-Zeenea-Scanners-prerequisite-and-setup](https://support.zeenea.com/hc/en-001/articles/21059970696721-Zeenea-Scanners-prerequisite-and-setup)
   </font>

2. Click **Download Scanner**:
   
      ![](/img/zeenea-scanner-download.png)

3. Extract the tar file to the desired location.

## Step 2: Create an API Key

1. Go to the [API Keys](https://actian-dev.preprod.zeenea.app/admin/api-keys) page and click **New API Key**:

      ![](/img/zeenea-api-keys1.png)
2. Enter a name for the scanner, select **Scanner** under **Permission Scope**, then click **Create**:

      ![](/img/zeenea-api-keys2.png)
3. Copy the API key for later use.

## Step 3: Create the Configuration File

1. Open `[scanner_install_dir]/conf`.
2. Rename `application.conf.template` to `application.conf`.
3. Specify your scanner platform URL and API key in `application.conf`: 
     ```
     zeenea-url = [Your platform URL]
     authentication = {[paste api-key.secret here]}
     ```

## Step 4: Install the JDBC Connector Plugin

1.  Download the Generic JDBC connector plugin from the [Zeenea connectors download links page](https://support.zeenea.com/hc/en-001/articles/21268131221265-Connectors-download-links), or download directly using this link: [JDBC Connector Plugin](https://plugins.zeenea.app/jdbc-connector-plugin/jdbc-connector-plugin-74.zip). You can also build a custom connector: https://github.com/zeenea/public-connector-sdk/blob/main/README.md.
2.  Move the connector plugin zip file to the `[scanner_install_dir]/plugins` folder. **Do not unzip the archive**.
3.  Download the JDBC driver from Actian ESD: https://esd.actian.com/product/drivers/JDBC/java/JDBC, and extract the `iijdbc.jar` file to the `[scanner_install_dir]/lib-ext` folder.
4.  Add the connector config file to the `[scanner_install_dir]/connections` folder.
5.  CD to `[scanner_install_dir]`.
6.  Start Scanner (Windows: `.\bin\zeenea-scanner.bat`, Linux: `bin/zeenea-scanner`)
     
     :::note
     This script must be started from the root directory of the Scanner. It will not work if you execute the scanner startup script directly from the bin folder.
     :::

## Step 5: Check the Scanner Status
1. In Zeenea Administration, click **Scanners** and verify that your scanner is running:

      ![](/img/zeenea-scanners.png)
2.  If you encounter any issues, review the `scanner.log` file located in the `[scanner_install_dir]/logs` folder for troubleshooting guidance. Also refer to [Troubleshooting for scanners and connections](https://support.zeenea.com/hc/en-001/articles/21059830419345-Troubleshooting-for-scanners-and-connections).


 