# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### v2.2.13 (2019-30-2019)

Eliminación de los siguientes comandos:

- `generate config`: Los desarrolladores no necesitan la carpeta config.
- `generate docker`: El proceso de integración continua se simplifico de tal modo que ya solo se usa el buildspec configurado para el codebuild.

### v2.2.8 (2019-26-05)

Creación de los siguientes comandos:

- `run update_triggers`: Comando que ejecuta aws cli para asociar el trigger indicado en el json seleccionado
- `generate trigger <arn>`: Comando que genera los archivos empleados para asociar los triggers a los codecommit
- `vtex npm_install`: Comando que permite realizar la instalación de las dependencias en los proyectos de react o node
- `vtex coverage`: Comando que permite configurar y ejecutar las pruebas con jest en react o node

Eliminación de los siguientes comandos:

- `vtex set_vendor <vendor>`: No es necesario ya que el echo de modificar el vendor no soluciona el problema de multi site

### v2.1.4 (2019-09-04)

Creación de los siguientes comandos

- `generate vtex_json`: Comando que permite crear el archivo de configuración de vtex, en este archivo ellos almacenan las credenciales del usuario.
- `generate docker <environment> <vendor> <workspace> <email>`: Comando que permite crear los archivos .dockerfile para el proceso de integración continua. se necesita pasar el environment 'prod' o 'dev'.
- `generate sonar <repository> <version> <src>`: Comando que permite crear el archivo de sonar, se necesita pasar el nombre del repositorio.
- `vtex login <account> <workspace> <email>`: Comando que permite realizar el login por consola.
- `vtex set_vendor <vendor>`: Comando que permite renombrar el vendor de un proyecto. este comando se emplea para renombrar los proyectos y permitir el multi sitio

Se crean los comandos aws, vtex, infra

```bash
aws                             Aws options
aws clone <criteria> [all]      Clone specific list of projectos from aws, if your add the option <all>
```

```bash
infra             Proyects infra options
infra update      Update the continuous integration and commit the changes.
```

```bash
vtex                                           Vtex options
vtex run <command> [all]                       Execute specific command from vtex, the current commands suport is: <link>, <publish>
vtex publish                                   Publish only one component into Vtex
vtex login <account> <workspace> <email>       Set credentials for vtex in the config file from vtex
vtex set_vendor <vendor>                       Set the vendor name in the manifest file
```

Se realizo una mejora en el almacenamiento de las credenciales. ahora se genera un archivo exito.json donde se almacenan las credenciales. para visualizar el contenido de este archivo pueden ejecutar en consola la siguiente linea `cat ~/.config/configstore/exito.json`

```bash
credentials                              Manage your credentials for aws
credentials get                          Gets the current credentials used in aws
credentials clear                        Clear the current credentials used in aws
credentials set <username> <pwd>         Sets the current credentials for aws
```

### v2.0.11 (2019-03-18)

Se soluciona el bug al clonar proyectos con el comando exito clone desde windows.

### v2.0.11 (2019-03-8)

Se remueve `"PollForSourceChanges": "false",` del template creado para cloudFormation, esta linea creaba las instancias de CodePipeline sin la opción de escuchar cambios de CodeCommit

### v2.0.10 (2019-02-13)

Creación del comando `exito generate` para realizar la creación de los templates para aws cloud formation con el comando `exito generate templte [repository name]` y la creación de la configuración básica de los projectos con el comando `exito generate config`

### v2.0.3, v2.0.4, v2.0.5 (2019-02-13)

Actualización de los comandos empleados para realizar el `publish` de los componentes en vtex, para realizar `link`. se optimizaron los comandos para el proceso de integración continua en Vtex

### v2.0.2 (2019-01-25)

Creación del comando `exito init` para la descarga de los códigos fuentes alojados en github

### v2.0.1 (2019-01-25)

Creación del comando `exito create workspace` para la creación de la configuración de los workspace de desarrollo

### v1.1.0 (2019-01-14)

Integración de la logica para realizar el proceso de integración continua de todos los proyectos a Vtex.

Se agrego el comando: `Continuos integration`

Este comando se encarga de realizar los siguientes procesos

1. Creación de un nuevo workspace `dev` y modificación del workspace a productivo con el comando `vtex workspace production true`
2. Clonación de los repositorios de aws con el prefijo indicado
3. Publicación de los componentes uno por uno en orden de importancia
4. Promover el workspace a producción, este comando remueve el workspace `dev` y pasa los cambios al workspace master

Se debe de tener en cuenta en todos los componentes a la hora de ser publicados:

- La versión del componente debe de ser mayor a la actual, de lo contrario vtex no tomara los cambios realizados sobre el componente, para validar la versión actual de un componente publicado podemos emplear `vtex deps list` el cual lista las dependencias publicadas.

---
