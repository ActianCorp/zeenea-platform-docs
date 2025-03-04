---
title: Managing Connections
---

# Managing Connections

### Prerequisites  

To configure a connection between your IS and Zeenea, you must first: 

1. Install a scanner.
2. Install the plugin of the connector that is appropriate to your storage system.

    :::note[Notes]
    * These steps are described in the sections: Zeenea Scanners: prerequisite and setup
    * Go to the specific documentation of each connector to identify the prerequisites and the conditions of implementation: [Zeenea Connector Downloads](./zeenea-connectors-list.md)
    ::: 

## Creating a connection

A new connection is created by adding a new configuration file to the scanner:

* Find your connection configuration files in the /connections folder of the scanner.
* When the scanner starts up, it will analyze all the files in this folder and record all the valid connections on the platform.

In all connection configuration files, there are 3 systematic and mandatory parameters: 

* name = the name that will be displayed to catalog users for this connection 
* code = the unique identifier of the connection on the Zeenea platform. Once registered on the platform, this code must not be modified or the connection will be considered as new and the old one removed from the scanner
* connector_id = the type of connector to be used for the connection

The rest of the information to provide depends on the type of connector used and will be indicated in the template files. 

The name of the connection file does not matter, however it is advised to name it with the connection code.

A connection is considered valid if all of the following are true: 

* It is syntactically correct.
* All mandatory properties appear and are filled in.
* The authentication information to the target system is correct.
* The connection does not already exist on the Zeenea platform with a link to another scanner.

## Encryption of connection secrets

If you wish, you can encrypt the secrets of your connections using a tool provided by Zeenea. 

1. Go to the scanner folder.
2. Launch the zeenea-pwd executable. 
3. Follow the tool's instructions, then copy the encrypted secret to the connection's configuration file on the accurate property.
4. Managing connections from the administrator interface.

## List of connections

The connection listing page is accessible from the administration interface, under the "Connections" tab. It displays all connections within Zeenea. 

On this page, you will find active connections as well as the connections presenting an error.

    ![](../static/img/zeenea-connections-tab.png)
A connection is identified by catalog users by its name. For technical purposes, a connection is identified by the Zeenea platform by its unique code (displayed in square brackets on the right of its name). 

A connection can only be linked to one scanner at a time. It will be linked to the first one to register it and will be ignored by the following ones.

## Configuration of a connection

It is possible to view the detailed information of a connection, as defined at the scanner level, by clicking on "Settings" from the action menu of each connection. However, the secrets of the connection are not accessible from this interface and are kept by the scanner only.

    ![](../static/img/zeenea-connection-configuration.png)

You can also manage the connection options: 

* **Data Profiling**: Allows you to activate the calculation of statistical profiles for the connection's Dataset Fields. It is not available on all connectors. Please note that activating this option may have an impact on your host's billing. For more information on Data Profiling, see [Data Profiling](./zeenea-data-profiling.md).
* **Data Sampling**: Enables data sampling for all the connection's imported Datasets. This option is not available for all connectors. For more information on Data Sampling, see [Data Sampling](./zeenea-data-sampling.md).
* **Automatic import**: This option allows you to automatically import all new Items for a connection, without having to select them manually from the Studio. Beware of using an appropriate filter configuration at the connection level to avoid importing unwanted Objects.
 
Activating any of these options does not automatically trigger the execution of the functionality. You must then launch execution from the actions menu (see below) or wait for a job scheduled in the Scanner.

## Manually launching scanner jobs

From the actions menu, you have the possibility to trigger certain actions of the scanner, without waiting for a scheduled batch execution: 

* **Run inventory**: launches a new inventory of the connection and detects potential new Objects to import, or orphaned Objects (deleted from the source connection)
* **Update Imported Items**: launches an update of the source documentation of the connection's Objects and updates the schema of the already imported datasets (new Fields or orphaned Fields)
* **Run automatic import**: launches a new inventory, followed by an automatic import of the potential new Objects detected (action only available if the option is activated)
* **Synchronize**: updates the list of Objects in the connection in the catalog, as well as their source documentation (action only available on some connection types)
* **Run Data Profiling**: launches a new calculation of the statistical profiles of the connection's Fields (action available only if the option is activated)
* **Run Data Sampling**: Starts retrieval of sample data from the connection

## Connection statuses

* **Valid connection**: A connection that is considered valid allows the automatic update of the Items imported into the catalog as well as the import of new ones.
* **Connection in error**: Connections in error are distinguished from others by a red text in the connection cell. A connection in error:
    * Can no longer update the items imported into the catalog,
    * Can no longer be used by Zeenea Studio users to import new Items.
    * Remain available for reading in the catalog for all users along with the Items already imported. 

Reasons for a connection in error include the following: 
* The configuration file is no longer present in the scanner.
* The configuration file has a syntax error (missing mandatory parameter or badly written property name).
* The authentication settings to the target system provided in the configuration file are incorrect.

To find out the exact nature of the error, check the scanner logs.

## Deleting a connection  

In order to delete a connection from the Catalog, you must follow the next two steps: first, delete the connection from the scanner folder and then go to the administration interface and delete the connection.

### From the scanner
To delete a connection from a scanner : 

1. Go to the `/connections` folder of the scanner, 
2. Delete the configuration file corresponding to the connection you want to delete.
3. Restart the scanner. 

    :::note[IMPORTANT]
    Deleting the configuration file from the scanner does not delete the items imported into the catalog. Users will still be able to access the items imported from this connection, but these items will no longer be updated automatically and it will no longer be possible to import new ones into the catalog.
    ::: 

### From the administration interface  

It is temporarily not possible to remove an old connection from the Administration menu. It will remain visible in the list, however it will be greyed out in the import menu.

## Relocating a connection   

To relocate a connection to another scanner: 

1. Delete it from its original scanner first. (See the section above "Delete a connection from the scanner".)
2. Move the configuration file to the new scanner.
3. Restart the scanner.
4. Check in the detailed view of the destination scanner that the connection has been relocated. 

    :::note
    Operations on the scanners are only taken into account by the Zeenea platform every 10 seconds. It may take a few seconds for changes to appear on the interface.
    :::