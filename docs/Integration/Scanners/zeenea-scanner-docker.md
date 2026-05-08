# Creating a Docker Image for your Scanner

> **Disclaimer:** This Docker documentation is provided as an example. Adapt it to your context, following the online documentation about how to run a Zeenea Scanner.

## Introduction

Zeenea doesn’t provide an official Scanner image, but it’s rather easy to build your own.

This article shares all the necessary information you need to define your own image.

As it is an example, feel free to adapt this recommendation to your context.

## Dockerfile example

Here is a simple Dockerfile example:

```
FROM alpine:3

RUN     apk add --no-cache bash
RUN     apk add openjdk11

ARG     ZEENEA_VERSION

WORKDIR /opt

ARG     PACKAGE_FILE="zeenea-scanner-${ZEENEA_VERSION}.tar.gz"

COPY    "docker/${PACKAGE_FILE}" "${PACKAGE_FILE}"

RUN     tar xf "${PACKAGE_FILE}" && rm "${PACKAGE_FILE}" && mv zeenea-scanner-${ZEENEA_VERSION} zeenea-scanner

COPY    "docker/application.conf" "zeenea-scanner/conf/application.conf"
ADD     "connections/" "zeenea-scanner/connections"

COPY    "docker/entrypoint.sh" "/opt/entrypoint.sh"
ENTRYPOINT  ["/opt/entrypoint.sh"]
CMD ["start"]
```

Zeenea Scanner requires Java 11 to run &mdash; the image is based on Openjdk JRE 11 Slim.

It creates a user, having only the expected privileges, as described in our Scanner documentation. You can give him a Group and User ID to ease the administration out of the container, but that’s not mandatory at all.

## Get the binary
First, let’s create a fresh new folder, named, for instance, `zeenea-docker`.

Download (or get from our support) the Zeenea Scanner you want to dockerize.

Unzip the archive into `zeenea-docker` and rename the scanner folder `zeenea-scanner-latest` (instead of `zeenea-scanner-VERSION`)

## Build your image
Before building, you’ll need a startup script you image will use to run the Scanner process.

Here is an example of such a file. Save it as `entrypoint.sh`:

```
#!/usr/bin/env bash


function main() {
    find_scanner_home

    local cmd="$1"
    if is_command "$cmd"; then
        shift
#        set -x
        "$cmd" "$@"
    else
        echo "Invalid command $cmd"
    fi
}

function is_command() {
    if [[ "$(type -t $1)" == 'function' ]]; then
        return 0
    else
        return 1
    fi
}

function find_scanner_home() {
    if [ "$(uname -s | cut -c1-5)" = "Linux" ]; then
        SCRIPT=$(readlink -f "$0")
        SCRIPTPATH=$(dirname "$SCRIPT")
    elif [ "$(uname)" = "Darwin" ]; then
        SCRIPTPATH="$(cd "$(dirname "$0")" && pwd -P)"
    else
        exit
    fi

    SCANNER_HOME="$(cd "zeenea-scanner" && pwd -P)"
    echo "Scanner Root: $SCANNER_HOME"
}

function start() {
  if [ -n "$1" ]; then
    cd $SCANNER_HOME && ./bin/zeenea-scanner -Dconfig.file="$1"
  else
    cd $SCANNER_HOME && ./bin/zeenea-scanner
  fi
}

main "$@"
```

Copy your Dockerfile and `entrypoint.sh`, based on the examples above, into `zeenea-docker`.

Then, build your own Docker image:

`docker build -t zeenea-scanner:latest`

## Prepare your Scanner configuration

1. Create four folders wherever you want:

   `mkdir -p {conf,connections,plugins,logs}`

2. Copy the file `application.conf.template` from the previously downloaded scanner into the `conf` folder with `application.conf` as its new name.
3. Modify `application.conf` as needed. See [Managing Scanners](../Zeenea_Administration/zeenea-managing-scanners.md).
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

