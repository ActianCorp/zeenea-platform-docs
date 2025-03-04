---
title: Externalizing Embedded Connectors
---
# Externalizing Embedded Connectors

## Introduction

Previously, the Scanner embedded some of our Connectors whereas others were provided as plugins you needed to deploy separately.

Since we've decided to simplify and standardize the way the Scanner manages all its Connectors, they all became plugins starting from Scanner version 54.

The following list of the previously embedded connectors will help you identify those you will need to migrate if you decide to install a version of the Scanner greater or equal to 54. See our migration procedure in this article.

Previously embedded Connectors were:

| Connector	| Plugin |
| :--- | :--- |
| IBM DB2 | JDBC |
| Oracle RDBMS | JDBC |
| MySQL	| JDBC |
| MariaDB |	JDBC |
| Teradata | JDBC |
| Postgres SQL | JDBC |
| Sybase IQ	| Sybase IQ |
| Netezza | JDBC |
| Snowflake	| JDBC |
| Greenplum	| JDBC |
| Apache HDFS | HDFS |
| Apache Hive | Hive |
| Microsoft SqlServer | JDBC |
| Microsoft Azure ADLS Gen 1 | ADLS |
| Microsoft Azure ADLS Gen 2 | ADLS |
| Microsoft PowerBI Report Server | PowerBI Report |
| Amazon S3	| AWS S3 |
| Amazon AWS Redshift | JDBC |
| Google Cloud Storage | Google Cloud Storage |
| Google BigQuery Organization | Google Cloud BigQuery |
| Google BigQuery | Google Cloud BigQuery |
| Local Filesystem | Local Filesystem |
 
:::note
A Plugin can contain several Connectors.
:::

## Migration Procedure

If you decide to upgrade your Scanner from a version strictly prior to 54 to a version newer (or equal) to 54, you have to follow this procedure.

Upgrading the Scanner by itself remains unchanged. You only have to add these steps to the regular procedure:

1. For each Connector from the list right above having at least one existing Connection configured in your environment, visit their documentation article and download from there the connector Zip file.
2. Copy this file, without uncompressing it, to the `./plugins` folder.
3. Start your Scanner and observe its log file. You should see the Connector being taken into account, then the Connections being configured.

:::note
You'll only need to migrate your Connectors once. Future Scanner upgrades won't require you to follow these steps.
:::