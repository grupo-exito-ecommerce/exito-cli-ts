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

    aws                             Vtex options
    aws clone <criteria> [all]      Clone specific list of projectos from aws, if your add the option <all>, this automatical download all projects found with the specific <criteria>
    aws credentials                 Manage your credentials for aws

    generate                          Generate options for the project
    generate workspaces               Create the workspaces config for develops
    generate config                   Get the last config  for projects
    generate template <repository>    Create the template for aws cloud-formation for mount the infra structure for continuos integration

    vtex                                           Vtex options
    vtex run <command> [all]                       Execute specific command from vtex, the current commands suport is: <link>, <publish>
    vtex publish                                   Publish only one component into Vtex, This process create one ramdon workspace in Vtex and publish the component located in the current folder
    vtex login <account> <workspace> <email>       Set credentials for vtex in the config file from vtex

  Options:

    -h, --help  show help information
```

## Desarollo local

Start `npm run ts-watch`

local `sudo npm link` ò `node npm link`


## Promover a npm

Publish to npm `sudo npm publish`
