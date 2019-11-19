import chalk from "chalk";
import { ContentManifest, DependenciesListModel, executeCommands, findDependency, getDirectories, getListProjects, getManifestsContent, logger } from "../../../../shared";

// variable que indica donde se encuentan los archivos a emplear
let directory: string = "";
// variable que posee el comando que se va a ejecutar actualmente
let commands: string = "";
// variable que posee la lista de dependencias ordenadas por nivel
let dependenciesList: Array<DependenciesListModel> = [];
// variable que posee la información  de los manifest.json
let manifests: Array<ContentManifest> = [];
// variable que indica si se debe organizar el orden de las dependencias de mayor relevancia a menor
let orderList: boolean = false;

// 1. Método inicial que se encarga de buscar las carpetas dentro del directorio indicado.
export default async (command: string, all: string) => {
  // indico cual comando se va a ejecutar y cual directorio se va a emplear
  directory = process.cwd() + "/";
  orderList = true;

  // Capturo el flag para saber si empleo la ultima versión siempre o no.
  const SCAPECOMMAND = "--scape";
  const scapeCommand = process.argv.indexOf(SCAPECOMMAND) >= 0;

  commands = command;
  if (scapeCommand) {
    commands = command.replace(/\@S+/g, " ");
    commands = commands.replace(/\@AND+/g, "&&");
  }

  logger.debug(`Order dependencies list ${orderList}`);
  logger.debug(`Command to run: ${commands}`);
  logger.debug(`Directory to use: ${directory}`);

  if (command && directory) {
    // Realizo la busqueda en el directorio actual
    searchProjectCurrentDirectory(all);
  } else {
    logger.error(`No commands specified to run`);
  }
};

// Método que se encarga de buscar un proyecto en el directorio actual
export const searchProjectCurrentDirectory = async (all: string) => {
  logger.debug("Use the current location for search one project");
  let response = await findProjectContent([directory], all);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);

    if (files.length) {
      let subFiles = await findProjectContent(files, all);
      if (!subFiles) {
        process.exit(1);
      }
    } else {
      logger.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
};

export const findProjectContent = async (files: Array<string>, all: string) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  manifests = await getManifestsContent(files);

  // Obtengo el orden en que se van a compilar las dependencias
  dependenciesList = await getListProjects(manifests);

  // Luego de finalizar la busqueda de dependencias, paso a ejecutar los comandos por medio de consola
  if (dependenciesList.length) {
    // cambio el orden a asc, esto permitira ejecutar primero los componentes que son dependencias
    if (orderList) {
      dependenciesList.reverse();
    }

    // busco la dependencia en el manifest y paso toda su información de manifest
    logger.info(
      `You have ${chalk.redBright(
        `${dependenciesList.length}`
      )} proyects to link`
    );

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
    return true;
  } else {
    logger.debug(`No dependencies found in the current location`);
    return false;
  }
};
