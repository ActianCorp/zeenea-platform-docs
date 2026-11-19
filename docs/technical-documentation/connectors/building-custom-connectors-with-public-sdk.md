# Building Custom Connectors with the Public Connector SDK

If you need to connect to a system that is not supported by the available connectors, you can build your own connector using the Actian Data Intelligence Public Connector SDK.

The SDK is open source under the Apache 2.0 license and is available on GitHub: [Public Connector SDK](https://github.com/zeenea/public-connector-sdk).

## What You Need to Know

- A connector is a Java plugin that is loaded by the scanner.
- The SDK provides the interfaces that your connector implements to extract metadata, including datasets, fields, data processes, visualizations, and more.
- The repository README explains how to implement and package a connector.

## Installing Your Connector

Package your connector as a ZIP archive, then install it like any other plugin connector. For more information, see [Installing and Configuring Connectors as a Plugin](./connectors-install-as-plugin.md).
