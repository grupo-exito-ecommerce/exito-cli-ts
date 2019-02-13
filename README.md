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

    clone <criteria> [all]      Clone specific list of projectos from aws, if your add the option <all>, this automatical download all projects found with the specific <criteria>
    vtex <command> [all]        Execute specific command from vtex, the current commands suport is: <link>, <publish>
    publish                     Publish only one component into Vtex, This process create one ramdon workspace in Vtex and publish the component located in the current folder
    init                        Create basic files and folders for your VTEX app

    create             Command to create options
    create workspace   Create the workspaces config for develops

    generate                              Generate options for the project
    generate config                       Get the last config  for projects
    credentials                              Manage your credentials for aws
    credentials get                          Gets the current credentials used in aws
    credentials clear                        Clear the current credentials used in aws
    credentials set <username> <pwd>         Sets the current credentials for aws

  Options:

    -h, --help  show help information
```

## Desarollo local

Start `npm run ts-watch`

local `sudo npm link` ò `node npm link`


## Promover a npm

Publish to npm `sudo npm publish`
