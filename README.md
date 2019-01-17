# Exito CLI

## Instalación

```bash
npm i exito-cli

npm i -g exito-cli
```

Comandos disponibles:

```bash
npm run exito
Publish components (vtex publish)
Upload components to vtex (vtex link)
Clone projects from aws
Clear saved credentials
Continuos integration
```

## Desarollo local

local `sudo npm link` ò `node exito-cli`

Publish to npm `sudo npm publish`

## Documentación

**Publish components** (vtex publish): Permite publicar todos los componentes en orden de dependencia

**Upload components to vtex**: Permite analizar la carpeta donde se este corriendo el comando y obtener el orden en que se deben de subir los componentes a vtex, este comando es muy util cuando se necesitan subir muchos proyectos aun que también sirve con pocos proyectos. luego de obtener el orden de los componentes se inicia la subida de los componentes empleando el método de vtex `vtex link`

**Clone projects from aws**: Permite obtener los proyectos de aws, filtra los proyectos por medio de un prefijo que van a compartir todos los proyectos y luego realiza la clonación en el directorio indicado.

**Clear saved credentials**: Permite remover las credenciales guardas para aws.
