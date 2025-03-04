---
title: Zeenea Descriptor Format (ZDF)  
---

# Adding a ZDF Connection

## Connectors

Zeenea Descriptor Format (ZDF) plugin describes a set of three connectors allowing the management of datasets, visualizations and data processes based on declarative files.

:::note
**These connectors must be used in very specific cases where a traditional connector is not an option**. By using a description of the items instead of the discoverability mechanism used by regular connectors, you must ensure that you comply with the assertions that other connectors respect, such as the existence of elements.

**Don't hesitate to reach out your Customer Success Manager in case you need more information about these connectors**.
:::

## Adding a Connection

These three connectors work the same way and share the same configuration parameters.

###  Plugin Installation

These connectors are available in the zdf-connector-plugin.

It can be downloaded here: [Zeenea Connector Downloads](./zeenea-connectors-list.md).

For more information on how to install a plugin, please refer to the following article: [Installing and Configuring Connectors as a Plugin](./zeenea-connectors-install-as-plugin.md).

### Connection Settings

Creating and configuring connectors is done through a dedicated configuration file located in the `/connections` folder of the relevant scanner.

Read more: [Managing Connections](./zeenea-managing-connections.md)

### Configuration Templates:

The following links can be used to download configuration templates:

* [zdf-dataset.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgF8&d=%2Fa%2FNu000002lf09%2FtEQr1W0phzg21nSQpzd3Z2LL9n9wdK4FEO3VD3Ful_k&asPdf=false)
* [zdf-visualization.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgIL&d=%2Fa%2FNu000002lf1l%2Fsz0GVeVhOCGVWrGgW0j8T3hUw2igFa85jxkzmS4Hs.Y&asPdf=false)
* [zdf-lineage.conf](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgJx&d=%2Fa%2FNu000002lf3N%2FUlWOzC3GcEgFUkW8O3NGJuquSoVw6f44nocTd0yvFgs&asPdf=false)
* [empty_dataprocess_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUfit&d=%2Fa%2FNu000002lf4z%2Fdt8mFO7tuHk.0ooicZNgT31A.LNQqWPFcADrsBvG6Fk&asPdf=false)
* [example_dataprocess_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUgLZ&d=%2Fa%2FNu000002lf6b%2Fz4jLoeVL1zmw0wI6wSvN84do7byKhfPt.2jdDLDme8g&asPdf=false)
* [empty_visualization_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUbKL&d=%2Fa%2FNu000002lf8D%2F70sgTuXPSUK9jX3JbeFdVFmxV63xry3ISEbEqJseyNs&asPdf=false)
* [example_datasets_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUYuM&d=%2Fa%2FNu000002ldXr%2FhSvnsS0Gz4hj5yjjtXexDXIKO4eEP9p6JAy3nZgthPM&asPdf=false)
* [empty_datasets_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUe5J&d=%2Fa%2FNu000002lf9p%2FhJuTKF9YdDxLF6yEwgnRJw9Zd.qaaeL0gFCB3alppBo&asPdf=false)
* [example_visualization_description.zeenea](https://actian.file.force.com/sfc/dist/version/download/?oid=00D300000001XnW&ids=068Nu00000GUPr6&d=%2Fa%2FNu000002lfBR%2FA49pkIUsaja4qRMCu87JESPPHSuO847kIXOXe63nWHI&asPdf=false)

To connect to an instance, the parameters of the connection file must be completed with the following values:

<table>
  <tr>
    <th>Parameter</th>
    <th>Expected value</th>
  </tr>
  <tr>
    <td>`name`</td>
    <td>The name that will be displayed to catalog users for this connection.</td>
  </tr>
  <tr>
    <td>`code`</td>
    <td>The unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner.</td>
  </tr>
  <tr>
    <td>`connector_id`</td>
    <td>The type of connector to be used for the connection. Here, the value must be `zdf-dataset`, `zdf-visualization`, or `zdf-lineage`. Once defined, this value must not be modified.</td>
  </tr>
  <tr>
    <td>`enabled`</td>
    <td>
      <p>Optional</p>
        <p>Boolean (`true`/`false`) indicating whether the connection is active or not.</p>
        <p>Default value: `true`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.path`</td>
    <td>
      <p>Path to file or folder containing description files.</p>
      <p>This value is mandatory if no git repository is declared.</p>
      <p>If a git repository is declared, the value can be null or a path relative to the repository root.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.repository`</td>
    <td>
      <p>Optional</p>
      <p>URL of the git repository where to read the files.</p>
      <p>Example: `https://github.com/acme/bigproject`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.branch`</td>
    <td>
        <p>Optional</p>
        <p>Branch to clone. By default, HEAD is used.</p>
        <p>Example: `https://github.com/acme/bigproject`</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.token`</td>
    <td>
      <p>Optional</p>
      <p>Authentication Token</p>
      <p>Replaces the usage of the username/password parameters.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.username`</td>
    <td>
      <p>Optional</p>
      <p>Git user name. Requires password.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.token`</td>
    <td>
      <p>Optional</p>
      <p>Git user password. Requires username.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.workdir`</td>
    <td>
      <p>Optional</p>
      <p>Local working folder where the git repository will be cloned.</p>
    </td>
  </tr>
  <tr>
    <td>`connection.git.cleandir`</td>
    <td>
      <p>Optional</p>
      <p>Boolean (`true`/`false`) indicating whether the working folder should be deleted after processing. If deleted, the repository will be cloned at each operation, otherwise only an update will be performed.</p>
      <p>Default value: `false`</p>
    </td>
  </tr>
</table>

## zdf-dataset
This is a Dataset connector.

It operates according to the inventory/import/update cycle. The objects inventoried are Datasets.

Description files are in JSON format. The root is an object containing two attributes.

<table>
  <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
  <tr>
    <td>datasets</td>
    <td>`List<ZdfDataset>`</td>
    <td>Dataset list</td>
  </tr>
  <tr>
    <td>lineage</td>
    <td>`List<ZdfProcess>`</td>
    <td>List of lineage links linked to datasets</td>
  </tr>
</table>

## zdf-visualization

This is a Visualization connector.

It operates according to the inventory/import/update cycle. The objects inventoried are the Visualizations.

Description files are in JSON format. The root is an object containing two attributes.

<table>
  <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
  <tr>
    <td>visualizations</td>
    <td>`List<ZdfVisualization>`</td>
    <td>Visualization list</td>
  </tr>
  <tr>
    <td>lineage</td>
    <td>`List<ZdfProcess>`</td>
    <td>List of lineage links between visualizations' internal datasets and external datasets</td>
  </tr>
</table>

## zdf-lineage

This is a Data Process connector.

It works with a single synchronization operation.

Description files are in JSON format. The root is an object containing an attribute.

<table>
  <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
  <tr>
    <td>lineage</td>
    <td>`List<ZdfProcess>`</td>
    <td>List of lineage links between the Data Process and  its datasets</td>
  </tr>
</table>

## Description File Discovery

The connector recursively searches all ordinary files with the extension `.zeenea` starting from the search root. The root can also refer to a single valid file.

If no git repository is declared, the root is specified by the `connection.path` parameter.

If a git repository is declared, the repository is cloned into the working folder, or updated if the clone is already present. The root folder is the concatenation of the working folder and the `connection.path` parameter. At the end of processing, if the `connection.git.cleandir` option is `true`, the working folder is deleted.

## Format Details

<font color="red">NOTE: Some attributes below have a "*" next to them, but there is no corresponding footnote.</font>

### ZdfDataset

Dataset description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`path`</td>
     <td>`Text`</td>
     <td>
        <p>Path identifying the dataset in relation to the connection.</p>
        <p>If not specified, the path will be `/dataset/`. Example: `/crm_db/sap/customer`.</p>
    </td>
   </tr>
   <tr>
     <td>`name`*</td>
     <td>`Text`</td>
     <td>Dataset name</td>
   </tr>
   <tr>
     <td>`description`</td>
     <td>`Text`</td>
     <td>Dataset description</td>
   </tr>
   <tr>
     <td>`owner`</td>
     <td>ZdfOwner</td>
     <td>Dataset owner contact</td>
   </tr>
   <tr>
     <td>`fields`*</td>
     <td>`List<ZdfField>`</td>
     <td>Dataset field list</td>
   </tr>
   <tr>
     <td>`foreignKeys`</td>
     <td>`List<ZdfForeignKey>`</td>
     <td>Foreign key list</td>
   </tr>
   <tr>
     <td>`type`</td>
     <td>`Text`</td>
     <td>Source property `type`</td>
   </tr>
   <tr>
     <td>`label`</td>
     <td>`Text`</td>
     <td>
        <p>Source property `label`.</p>
        <p>**Note**: This is different from the `name` property.</p>
    </td>
   </tr>
   <tr>
     <td>`format`</td>
     <td>`Text`</td>
     <td>Source property `format`</td>
   </tr>
   <tr>
     <td>`numberOfRows`</td>
     <td>`Text`</td>
     <td>Source property `number of rows`</td>
   </tr>
   <tr>
     <td>`diskUsage`</td>
     <td>`Text`</td>
     <td>Source property `disk usage`</td>
   </tr>
   <tr>
     <td>`location`</td>
     <td>`Text`</td>
     <td>Source property `location`</td>
   </tr>
   <tr>
     <td>`project`</td>
     <td>`Text`</td>
     <td>Source property `project`</td>
   </tr>
   <tr>
     <td>`catalog`</td>
     <td>`Text`</td>
     <td>Source property `catalog`</td>
   </tr>
   <tr>
     <td>`schema`</td>
     <td>`Text`</td>
     <td>Source property `schema`</td>
   </tr>
   <tr>
     <td>`database`</td>
     <td>`Text`</td>
     <td>Source property `database`</td>
   </tr>
   <tr>
     <td>`replicationFactor`</td>
     <td>`Text`</td>
     <td>Source property `replication factor`</td>
   </tr>
   <tr>
     <td>`tags`</td>
     <td>`Text`</td>
     <td>Source property `tags`</td>
   </tr>
   <tr>
     <td>`sourceSystem`</td>
     <td>`Text`</td>
     <td>Source property `source system`</td>
   </tr>
   <tr>
     <td>`origin`</td>
     <td>`Text`</td>
     <td>Source property `origin`</td>
   </tr>
   <tr>
     <td>`creationDate`</td>
     <td>`Text`</td>
     <td>Source property `creation date`</td>
   </tr>
   <tr>
     <td>`updateDate`</td>
     <td>`Text`</td>
     <td>Source property `update date`</td>
   </tr>
   <tr>
     <td>`createdBy`</td>
     <td>`Text`</td>
     <td>Source property `created by`</td>
   </tr>
   <tr>
     <td>`updatedBy`</td>
     <td>`Text`</td>
     <td>Source property `updated by`</td>
   </tr>
   <tr>
     <td>`comments`</td>
     <td>`Text`</td>
     <td>Source property `comments`</td>
   </tr>
 </table>

### ZdfVisualization

A visualization description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`path`</td>
     <td>`Text`</td>
     <td>
      <p>Path identifying the view in the connection.</p>
      <p> If not specified, the path will be `/report/` (example: `/report/sales_evolutions`).</p>
    </td>
   </tr>
   <tr>
     <td>`name`*</td>
     <td>`Text`</td>
     <td>Visualization name</td>
   </tr>
   <tr>
     <td>`description`</td>
     <td>`Text`</td>
     <td>Visualization description</td>
   </tr>
   <tr>
     <td>`owner`</td>
     <td>`ZdfOwner`</td>
     <td>Visualization owner contact</td>
   </tr>
   <tr>
     <td>`datasets`*</td>
     <td>`List<ZdfDataset>`</td>
     <td>List of the visualization's internal datasets.<br /><br />**Note**: these objects represent access to visualization data. They belong to the visualization and cannot be shared. Their life cycle is the same as that of the visualization to which they are attached.<br /><br />Shared datasets must be produced in another connection with the zdf-dataset connector.</td>
   </tr>
</table>

### ZdfProcess

Process description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`path`</td>
     <td>`Text`</td>
     <td>
      <p>Path identifying the process in relation to the connection.</p>
      <p>If not specified, the path will be `/transformation/`.</p>
      <p>Example: `/transformation/47ccd226-11e1-11ef-9b10-00155d60aaf0`</p>
    </td>
   </tr>
   <tr>
     <td>`name`*</td>
     <td>`Text`</td>
     <td>Process name</td>
   </tr>
   <tr>
     <td>`description`</td>
     <td>`Text`</td>
     <td>Process description</td>
   </tr>
   <tr>
     <td>`owner`</td>
     <td>`ZdfOwner`</td>
     <td>Process owner contact</td>
   </tr>
   <tr>
     <td>`inputs`</td>
     <td>`List<ZdfDatasetRef>`</td>
     <td>List of process input dataset references</td>
   </tr>
   <tr>
     <td>`outputs`</td>
     <td>`List<ZdfDatasetRef>`</td>
     <td>List of process output dataset references</td>
   </tr>
</table>

### ZdfField

A field description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`name`*</td>
     <td>`Text`</td>
     <td>Field name</td>
   </tr>
   <tr>
     <td>`description`</td>
     <td>`Text`</td>
     <td>Field description</td>
   </tr>
   <tr>
     <td>`nativeType`</td>
     <td>`Text`</td>
     <td>
        <p>Native type of the field.</p>
        <p>If unset, the `dataType` value is used.</p>
      </td>
  </tr>
  <tr>
    <td>`dataType`</td>
    <td>`Text`</td>
    <td>
      <p>Zeenea type of the field.</p>
      <p>If unset, the `nativeType` value is used.</p>
      <p>Allowed values are:</p>
      <ul>
        <li>`boolean`</li>
        <li>`byte`</li>
        <li>`short`</li>
        <li>`integer`</li>
        <li>`long`</li>
        <li>`float`</li>
        <li>`double`</li>
        <li>`string`</li>
        <li>`date`</li>
        <li>`timestamp`</li>
        <li>`binary`</li>
        <li>`struct`</li>
        <li>`unknown`</li>
      </ul>
    </td>
  </tr>
   <tr>
     <td>`isNullable`</td>
     <td>`Boolean`</td>
     <td>The field can be null. Default value `false`.</td>
  </tr>
   <tr>
     <td>`isMultivalued`</td>
     <td>`Boolean`</td>
     <td>The field can contain <font color="red">[WHAT?]</font>. Default value `false`.</td>
  </tr>
   <tr>
     <td>`isPrimaryKey`</td>
     <td>`Boolean`</td>
     <td>The field is part of the primary key. Default value `false`.</td>
  </tr>
   <tr>
     <td>`encoding`</td>
     <td>`Text`</td>
     <td>Source property `encoding`</td>
  </tr>
   <tr>
     <td>`format`</td>
     <td>`Text`</td>
     <td>Source property `format`</td>
  </tr>
   <tr>
     <td>`length`</td>
     <td>`Text`</td>
     <td>Source property `length`</td>
  </tr>
</table>

## ZdfDatasetRef

A link to a dataset.

The link can be represented either with the identification key, or with the connection code and identification path.

One of the attributes `identificationKey` or `path` must be filled in.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`identificationKey`</td>
     <td>`Text`</td>
     <td>Dataset [identification key](./zeenea-identification-keys.md)</td>
   </tr>
   <tr>
     <td>`connectionCode`</td>
     <td>`Text`</td>
     <td>Connection code. Leave blank if this is the current connection. It is possible to use one of the connection aliases.</td>
   </tr>
   <tr>
     <td>`zeepath`</td>
     <td>`Text`</td>
     <td>Dataset path</td>
   </tr>
  </table>

## ZdfOwner

A contact description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`role`*</td>
     <td>`Text`</td>
     <td>Contact role</td>
   </tr>
   <tr>
     <td>`email`*</td>
     <td>`Text`</td>
     <td>Contact email address</td>
   </tr>
   <tr>
     <td>`firstname`</td>
     <td>`Text`</td>
     <td>Contact first name</td>
   </tr>
   <tr>
     <td>`lastname`</td>
     <td>`Text`</td>
     <td>Contact last name</td>
   </tr>
  </table>

## ZdfForeignKey

A foreign key description.

 <table>
   <tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
   <tr>
     <td>`dataset`*</td>
     <td>`Text`</td>
     <td>Path of the target dataset (the one with the primary key)</td>
   </tr>
   <tr>
     <td>`sourceFields`*</td>
     <td>`List`</td>
     <td>Source dataset field list</td>
   </tr>
   <tr>
     <td>`targetFields`</td>
     <td>`List`</td>
     <td>Target dataset field list</td>
   </tr>
   <tr>
     <td>`name`</td>
     <td>`Text`</td>
     <td>Foreign key name</td>
   </tr>
  </table>  
