---
title: dbt Cloud
---

# Adding a dbt Cloud Connection

## Prerequisites

* It is assumed that the Zeenea Scanner has been successfully downloaded and configured. See [Zeenea Scanner Setup](./zeenea-scanner-setup.md).
* Scanner Version 78 or higher is required to use dbt Cloud connector. 
* Java 11 is required to run the dbt Cloud connector.

## Installing the dbt Cloud Connector Plugin

1. Download the dbt Cloud connector plugin from the [Zeenea Connector Downloads](./zeenea-connectors-list.md), or download directly at <font color="red">Need link</font>.
2. Move the zip file to the `[scanner_install_dir]/plugins` folder. **Do not unzip the archive**.

## Creating the Configuration File

1. In the `[scanner_install_dir]/connections` folder, create a new file named `dbtCloud.conf`. (The file can be named as desired, but the file extension must be `.conf`.)
2. Copy and modify the content below based on your environment configuration, replacing `<API-TOKEN>` and `<ACCOUNT-PREFIX>` with the appropriate values for your environment.
   
```
# code and name can be anything
code = "DbtCloud-1"
name = "Dbt Cloud 1"
# Connector ID (do not change)
connector_id = "dbt-cloud"
enabled = true
# enter the following based on your dbt cloud account
dbt.api_token = "<API-TOKEN>"
dbt.account_prefix = "<ACCOUNT-PREFIX>"
```

The `dbt.api_token` and `dbt.account_prefix` values can be found in your dbt account. The account prefix can be found in your Account page. The API token can be found in the section named "Personal tokens" under API tokens. For more information, see [dbt Developer Hub](https://docs.getdbt.com/dbt-cloud/api-v2#/authentication). 

     ![](/img/zeenea-dbt-cloud1.png)

     ![](/img/zeenea-dbt-cloud2.png)

## Verifying the Connection

1. Restart Zeenea Scanner.
2. In Zeenea Administration, click **Connections** and verify that the new connection is listed without any error message:

     ![](/img/zeenea-dbt-cloud3.png)

3. If you encounter any issues, review the scanner.log file located in the `[scanner_install_dir]/logs` folder for troubleshooting guidance. Also refer to [Troubleshooting for Scanners and Connections](./zeenea-troubleshooting.md).

## Manually Syncing the Connection

To manually start a scan, go to Zeenea Administration and open the Connections page, then click the ellipsis button in the **Actions** column and click on **Synchronize**:

     ![](/img/zeenea-dbt-cloud4.png)

## Confirming Data in Zeenea

Switch to Zeenea Studio and click **Catalog** to view the scanned data:

     ![](/img/zeenea-dbt-cloud5.png)

### What You’ll See

When you filter by your dbt Cloud Connector, you’ll see a variety of Datasets and DataProcesses. The connector captures Job-Run data. The connector gets the last successful Run for a Job. The connector will only scan Jobs that have had at least one successful Run. 