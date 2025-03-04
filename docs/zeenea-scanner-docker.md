---
title: Creating a Docker Image for your Scanner
---

# Creating a Docker Image for your Scanner

:::note[Disclaimer]
This Docker documentation is provided as an example. Adapt it to your context, following the online documentation about how to run a Zeenea Scanner.
:::

## Introduction

Zeenea doesn’t provide an official Scanner image, but it’s rather easy to build your own.

This article shares all the necessary information you need to define your own image.

As it is an example, feel free to adapt this recommendation to your context.

## Dockerfile example

Here is a simple Dockerfile example:

<font color="red">
Missing image
</font>

Zeenea Scanner requires Java 11 to run &mdash; the image is based on Openjdk JRE 11 Slim.

It creates a user, having only the expected privileges, as described in our Scanner documentation. You can give him a Group and User ID to ease the administration out of the container, but that’s not mandatory at all.

## Get the binary
First, let’s create a fresh new folder, named, for instance, `zeenea-docker`.

Download (or get from our support) the Zeenea Scanner you want to dockerize.

Unzip the archive into `zeenea-docker` and rename the scanner folder `zeenea-scanner-latest` (instead of `zeenea-scanner-VERSION`)

## Build your image
Before building, you’ll need a startup script you image will use to run the Scanner process.

Here is an example of such a file. Save it as `entrypoint.sh`:

<font color="red">
Missing image
</font>

Copy your Dockerfile and `entrypoint.sh`, based on the examples above, into `zeenea-docker`.

Then, build your own Docker image:

`docker build -t zeenea-scanner:latest`

## Prepare your Scanner configuration

1. Create four folders wherever you want:

   `mkdir -p {conf,connections,plugins,logs}`

2. Copy the file `application.conf.template` from the previously downloaded scanner into the `conf` folder with `application.conf` as its new name.
3. Modify `application.conf` as needed. See [Managing Scanners](./zeenea-managing-scanners.md).
4. Copy `log4.xml` file into the `conf` folder.
5. Modify its content if necessary.
6. Drop your plugins into the `plugins` folder and configure your connections in the `connections` folder.

As you may have multiple scanners, each will have its own name.

This name is very important as it determines which scanner handles which connection.

This name will be provided as an env variable to the container (see below).

## Run your Dockerized Zeenea Scanner

Considering your four folders were created locally under `/opt/zee`, the startup script may be as follows:

```
SCANNER_NAME=myscanner-identifier &&
docker run \
 -d \
 -h $SCANNER_NAME \
 --name $SCANNER_NAME \
 -v /opt/zee/conf:/opt/zeenea-scanner/conf:rw \
 -v /opt/zee/connections:/opt/zeenea-scanner/connections:rw \
 -v /opt/zee/plugins:/opt/zeenea-scanner/plugins:rw \
 -v /opt/zee/logs:/opt/zeenea-scanner/logs:rw \
 -e SCANNER_IDENTIFIER=$SCANNER_NAME \
 -e JAVA_XMX=4g \
 --restart unless-stopped \
 zeenea-scanner:latest
```

Your container will share the name by which Zeenea platform knows it.

Choose a unique name and set the `SCANNER_NAME` env variable.

If you upgrade or have to destroy and recreate the container, stick with the name initially chosen so that the platform will consider the new running scanner as the one previously registered.

