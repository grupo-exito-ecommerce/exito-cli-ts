# Exito CLI

## Instalación

```bash
npm i exito-cli

npm i -g exito-cli
```

Comandos disponibles:

```bash

$ exito
Usage: exito <command> [options]

  Commands:

    init        Create basic files and folders for your VTEX app

    credentials                              Manage your credentials for aws
    credentials get                          Gets the current credentials used in aws
    credentials clear                        Clear the current credentials used in aws
    credentials set <username> <pwd>         Sets the current credentials for aws

    aws                             Vtex options
    aws clone <criteria> [all]      Clone specific list of projectos from aws, if your add the option <all>

    infra             Vtex options
    infra update      Update the continuous integration and commit the changes.

    generate                           Generate options for the project
    generate vtexjson                  Create the json file config of vtex
    generate workspaces                Create the workspaces config for develops
    generate config                    Get the last config  for projects
    generate docker <environment>      Create the docker file for aws code-build in environment production (prod) and develop (dev)
    generate template <repository>     Create the template for aws cloud-formation for mount the infra structure for continuos integration

    vtex                                           Vtex options
    vtex run <command> [all]                       Execute specific command from vtex, the current commands suport is: <link>, <publish>
    vtex publish                                   Publish only one component into Vtex
    vtex login <account> <workspace> <email>       Set credentials for vtex in the config file from vtex
    vtex set_vendor <vendor>                       Set the vendor name in the manifest file

  Options:

    -h, --help  show help information
```

## Desarollo local

Start `npm run ts-watch`

local `sudo npm link` ò `node npm link`


## Promover a npm

Publish to npm `sudo npm publish`
