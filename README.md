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
    init                        Clone project
    
    create             Command to create options
    create workspace   Create the workspaces config for develops

    credentials                              Manage your credentials for aws
    credentials get                          Gets the current credentials used in aws
    credentials clear                        Clear the current credentials used in aws
    credentials set <username> <pwd>         Sets the current credentials for aws

  Options:

    -h, --help  show help information
```

## Desarollo local

local `sudo npm link` ò `node npm link`

Publish to npm `sudo npm publish`


## Librerias empleadas

[Inquirer](https://www.npmjs.com/package/inquirer)
