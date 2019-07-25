# Exito CLI

## Instalación

 ```  bash
npm i exito

npm i -g exito
 ``` 

Comandos disponibles:

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
## Desarrollo local

  

Start `npm run ts-watch`

  

local `sudo npm link` ò ` node npm link`

  

## Publicar en npm

  

Publish to npm `sudo npm publish`

  
  

### Guide to use

  
  

#### Comandos `exito vtex`

  

`exito vtex run <command> [all]`: Comando que permite ejecutar el comando indicado en todos los proyectos encontrados tanto en el directorio actual como en los subdirectorios, los proyectos encontrados se organizan en orden de importancia de las dependencias, los comandos que se pueden pasar son `vtex link` | `vtex publish`

> Ejemplo: `exito vtex run 'vtex link' `

> Puede emplear el flag `--scape` para escapar un texto con caracter especial. esto se emplea en integración continua donde se reemplazan los especacións y los caracteres `&&` por caracteres que el comando entiende y los reemplaza al momento de ejecutar los comandos indicados.
  

`exito vtex install <adminPackage>`: Comando que permite realizar la instalación de las dependencias del proyecto encontrado en el directorio actual, este comando solo se emplea para integración continua y permite encontrar los proyectos clonados en dicho proceso. se puede indicar con que se quiere instalar las dependencias ya sea `yarn` o `npm`

  

> Ejempo: `exito vtex install yarn install`

  

`exito vtex publish <command>`: Comando que permite publicar el proyecto que se encuentre en el directorio actual o en los sub directorios.

  

> Ejemplo: `exito vtex publish 'vtex workspace use master && vtex publish --verbose'`

  

`exito vtex login <account> <workspace> <email> <token>`: Comando que permite iniciar sesión por medio de consola con vtex, requiere los parámetros indicados para realizar la validación, obtiene el token a emplear para el proceso de vtex.

  

`exito vtex setVendor <vendor>`: Comando que permite encontrar un proyecto en el directorio o subdirectorio actual y sobre escribir el vendor del proyecto que se encuentre.

  

> Ejemplo: `vtex setVendor exito` `vtex setVendor exitocol`

`exito vtex updateDepProject`: Comando que permite actualizar en las dependencias el proyecto actual. toma el `vendor`.`name`@`version` del proyecto que encuentre en el directorio actual

`exito vtex coverage`: Comando que permite ejecutar el proceso de ejecución de las pruebas de los proyectos.

  
  
  
  

#### Comandos`exito generate`

  
  

`exito generate triggerConfig`: Comando que genera un archivo base con la configuración para los triggers.

  

``` json

[{
	"name": "develop",
	"customData": {
		"codeBuild": "exito-vtex-deploy-develop",
		"vendor": "exito",
		"workspace": "dev",
		"codeCommitBranch": "develop",
		"urlToClone": "https://git-codecommit.us-east-1.amazonaws.com/v1/repos",
		"linkCommand": "vtex link",
		"publishCommand": "'vtex workspace use master && vtex publish --verbose'"
	}
}]

```

  

Para crear diferentes triggers en un solo proyecto es necesario copiar la configuración base y reemplazar los puntos importantes, `name` `code_build` `vendor` `workspace` `code_commit_branch`

  

El atributo `url_to_clone` no se debe de cambiar, este es el endpoint para el repositorio de aws code commit

  



##### Ejemplo

``` json
[{
	"name": "develop",
	"customData": {
		"codeBuild": "exito-vtex-deploy-develop",
		"vendor": "exito",
		"workspace": "dev",
		"codeCommitBranch": "develop",
		"urlToClone": "https://git-codecommit.us-east-1.amazonaws.com/v1/repos",
		"linkCommand": "'vtex link'",
		"publishCommand": "'vtex workspace use master && vtex publish --verbose'"
	}
},
{
	"name": "master",
	"customData": {
		"codeBuild": "exito-vtex-deploy-master",
		"vendor": "exito",
		"workspace": "master",
		"codeCommitBranch": "master",
		"urlToClone": "https://git-codecommit.us-east-1.amazonaws.com/v1/repos",
		"linkCommand": "'vtex link'",
		"publishCommand": "'vtex workspace use master && vtex publish --verbose'"
	}
}]
  
Con esta configuración se generarán dos triggers apuntando a diferentes branchs y llamando a diferentes codebuild. además de realizar un proceso de login en un workspace llamado `dev` y otro `master`

  

`exito generate trigger <arn>`: Comando que genera un archivo `.json` que contiene la configuración para agregar los trigger necesarios para realizar la comunicación con el CodeBuild de `develop` o `master`.

  

`exito run triggers`: Comando que se encarga de leer el directorio actual y permitir realizar la ejecución de los archivos `.json` que contienen la configuración para actualizar o agregar los triggers de un repositorio.

  

`exito generate configDependencies <criteria>`: Comando que toma el archivo `current-dependencies.json` del directorio actual y genera un archivo `update-dependencies.json` con las dependencias filtradas y el formato igual al de el atributo `dependencies` del archivo `manifest.json`

  

> ejemplo: `exito generate cd vtex.`: genera el archivo con todas la dependencias que coincidan con el criterio indicado `vtex.`

> Nota: Cuando un proyecto posee más de una versión empleada actualmente, se pasa a formar el nombre de la dependencia junto a sus posibles versiones separadas por un `-` ejemplo: `"vtex.styleguide": "9.67.0-8.67.0",` donde las posibles versiones son `9.67.0` y `8.67.0`

  

`exito generate sonar <repository> <version> <src> `: Comando para generar el archivo base de sonarQube.

  

`exito generate workspaces`: Comando que permite realizar la creación de los branchs indicados en base a la estructura planteada de trabajo con workspace.

  

`exito generate vtexJson`: Comando que permite generar el archivo de `.json` que vtex emplea para guardar las credenciales del usuario

  
  
  

#### Comandos `exito run`

  
  

`exito run overWriteDependencies <criteria> [lastVersion]`: Comando que toma el archivo `update-dependencies.json` en el directorio actual y luego se encarga de buscar todos los proyectos que hayan en el directorio para listarlos y permitir la selección de los proyectos a actualizar. luego de seleccionar los proyectos se pasa a realizar una validación para saber si poseen cambios a nivel de dependencias y de ser así se pasa a actualizar las dependencias encontradas. este proceso actualiza un dígito la versión del proyecto y genera un mensaje en el archivo `CHANGELOG.md` indicanto que cambios se realizaron.

  

>Nota: por defecto el comando trae la última versión de la dependencia que posee el proyecto. con el flag `--last` luego del criterio de búsqueda se pasa a emplear la última versión disponible de la dependencia.

  

> Ejemplo: `exito run ov vtex. --verbose`

>

> Ejemplo empleando la ultima versión: `exito run ov vtex. --last --verbose`

  
  

`exito run triggers`: Comando que se encarga de leer el directorio actual y permitir realizar la ejecución de los archivos `.json` que contienen la configuración para actualizar o agregar los triggers de un repositorio.

  

#### Comandos `exito aws`

  
  

`exito aws clone <criteria> [branch] [all]`: Comando que permite realizar la clonación de los proyectos de AWS en base a un criterio de búsqueda.

  

`exito aws runGitCommand <commandTouse>` comando que permite seleccionar los proyectos en el directorio actual y se encarga de correr el comando de git indicado.

  
  

#### Comandos `exito credentials`

  

`exito credentials set <username> <pwd>`: Comando que permite guardar las credenciales que se emplean para realizar la clonación de los repositorios de AWS.

  

`exito credentials get`: Retorna las credenciales que se están empleando actualmente

`exito credentials clear`: Remueve las credenciales actuales

  
  

#### Comandos `exito init`

  

`exito init`: Comando que permite realizar la clonación de los proyectos configurados.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc5ODQ4MTUxMl19
-->