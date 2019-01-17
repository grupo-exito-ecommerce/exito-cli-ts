import log from "../../../shared/logger";

var { getDirectories, getContentFiles } = require("../util/fs");
var { getListProyects } = require("../util/getOrderDependencies");
var { findDependency } = require("../util/findDependencies");
var { executeCommands } = require("../util/executeCommands");
// variable que indica donde se encuentan los archivos a emplear
let directory = "";
// variable que posee el comando que se va a ejecutar actualmente
let commands = "";
// variable que posee la lista de dependencias ordenadas por nivel
var dependenciesList = [];
// variable que posee la información  de los manifest.json
var manifests = [];
// variable que indica si se debe organizar el orden de las dependencias de mayor relevancia a menor
var orderList = false;

// 1. Método inicial que se encarga de buscar las carpetas dentro del directorio indicado.
export default async (command: string, all: string) => {
  // indico cual comando se va a ejecutar y cual directorio se va a emplear
  commands = `vtex ${command}`;
  directory = process.cwd() + "/";
  orderList = true;

  log.debug(`Order dependencies list ${orderList}`);
  log.debug(`Command to run: ${commands}`);
  log.debug(`Directory to use: ${directory}`);

  if (commands && directory) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado

    let files = await getDirectories(directory);

    if (files.length) {
      // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
      manifests = await getContentFiles(files);

      // Obtengo el orden en que se van a compilar las dependencias
      dependenciesList = await getListProyects(manifests);

      // Luego de finalizar la busqueda de dependencias, paso a ejecutar los comandos por medio de consola
      if (dependenciesList.length) {
        // cambio el orden a asc, esto permitira ejecutar primero los componentes que son dependencias
        if (orderList) {
          dependenciesList.reverse();
        }

        // busco la dependencia en el manifest y paso toda su información de manifest
        log.info(`You have ${dependenciesList.length} dependencies to link`);

        let dependenciesToUse = dependenciesList;

        if (!all) {
          dependenciesToUse = await findDependency(dependenciesList);
        }

        if (dependenciesToUse.length) {
          let options = {
            position: 0,
            manifests: manifests,
            dependenciesList: dependenciesToUse,
            commands: commands
          };
          executeCommands(options);
        }
      } else {
        log.error(`No dependencies found in the current location`);
      }
    } else {
      log.error(`No projects found in ${directory}`);
    }
  } else {
    log.error(`No commands specified to run`);
  }
};
