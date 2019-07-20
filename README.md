# Exito CLI

## Installation

 ` ` ` bash
npm i exito

npm i -g exito
 ` ` ` 

Available commands:

 ``` bash
$ exito

 Usage: exito <command> [options]

  Commands:

    init        Create basic files and folders for your VTEX app

    credentials                              Manage your credentials for aws    credentials get                          Gets the current credentials used in aws
    credentials clear                        Clear the current credentials used in aws    credentials set <username> <pwd>         Sets the current credentials for aws

    aws                                      Aws options
    aws clone <criteria> [branch] [all]      Clone specific list of projectos from aws, if your add the option <all>
    aws runGitCommand <commandTouse>         Run the indicate git command in all projects selected

    run                        Execute options with the cli
    run triggers               Run a local triggers.json
    run overWriteDependencies <criteria> Overwrite the current dependencies in base to the file `update-dependencies.json` 

    generate                                          Generate options for the project
    generate configDependencies <criteria>            Create file config.json with the current dependencies for vtex projects
    generate vtexJson                                 Create the json file config of vtex
    generate workspaces                               Create the workspaces config for develops
    generate sonar <repository> <version> <src>       Create the sonar file for test
    generate trigger <arn>                            Create the triggers config for the indicate proyects        
    generate triggerConfig                            Create the trigger-config file for indicate the trigger options

    vtex                                           Vtex options
    vtex run <command> [all]                       Execute specific command from vtex, the current commands suport is: <link>, <publish>
    vtex install <adminPackage>                    Install the dependencies in the curren proyect with npm or yarn    vtex coverage                                  Run the coverage process in the proyect
    vtex publish                                   Publish only one component into Vtex
    vtex login <account> <workspace> <email>       Set credentials for vtex in the config file from vtex
    vtex setVendor <vendor>                        Set the vendor name in the manifest file

  Options:

    -h, --help  show help information
 ``` 

## Local development

Start `npm run ts-watch` 

local `sudo npm link` ò ` node npm link` 

## Promote to npm

Publish to npm `sudo npm publish` 

