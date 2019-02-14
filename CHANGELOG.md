# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

### v2.0.9 (2019-02-13)

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
