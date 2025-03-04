---
title: Configuring a Hook
---

# Configuring a Hook after a Scanner Job

This section covers scanners from version 72 upwards.

## Overview

Zeenea scanner enables you to configure hooks in the form of plugins.

These hooks allow you to trigger processing at the end of one of the following scanner jobs:

* Import
* update
* Synchronization

One single type of hook is supported in Scanner v72. This hook type allows you to trigger an external script.

At the end of each of the above jobs, the scanner will send the following environment variables to the hook:

* ZEENEA_HOOK_CONNECTOR_CODE: Connector code
* ZEENEA_HOOK_CONNECTION_ID: Connection id
* ZEENEA_HOOK_CONNECTION_CODE : Connection code

The list of items that have been successfully processed is also sent separated by carriage returns. This list of items is provided in the form of "zeepaths" (breadcrumb to an item). To build the identification key of an item, you must concatenate the connection code and the zeepath of the item.

Note that hook plugins work in a "fire and forget" mode. The hook does not send any information in return.

## Hooks Plugins

By default, a plugin named `external script` is provided in the scanner package starting from version 72 (its zip file is already in `./plugins`).

This plugin will let you execute an external script of your choice.

:::note
You will find a `readme` file containing script examples in the scanner package under the new `hooks` folder.
:::

## Installation and configuration

Current and upcoming hooks plugins must be installed in the `/plugins` folder like for connectors.

They must be copied as .zip files and will be unzipped by the scanner when restarting as regular connector plugins.

Then, you can add hooks using one of these plugins by creating a new `.conf` file in the `/hooks` folder.

In the configuration file, you must provide the following information:

* **enabled**: Hook activation [true|false]
* **code**: Hook code (unique code to identify the hook in the scanner logs for instance)
* **hook_id**: Hook plugin id. It refers to a specific hook plugin this configuration should be used with - ex: "external-script".
* Hook-specific parameters (ex: command to trigger the external script). Example of command for an external script: 
  
  `post_items_upsert_command = ["python", "mutate_business_terms.py"]`