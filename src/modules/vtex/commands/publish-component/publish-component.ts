import {
  ContentManifest,
  getDirectories,
  getManifestsContent,
  logger
} from "./../../../../shared";
import { childProcessRunCommandPublish } from "./util/child-process-publish";
const directory = process.cwd() + "/";

let commandToUse = "";

export default async function(command: string) {
  // Capturo el flag para saber si empleo la ultima versión siempre o no.
  const SCAPECOMMAND = "--scape";
  const scapeCommand = process.argv.indexOf(SCAPECOMMAND) >= 0;
  commandToUse = command;

  if (scapeCommand) {
    commandToUse = command.replace(/\@S+/g, " ");
    commandToUse = commandToUse.replace(/\@AND+/g, "&&");
  }

  logger.debug(`Command to run: ${commandToUse}`);
  logger.info("Loading publish component process");
  searchProjectCurrentDirectory();
}

const publishComponent = (manifest: ContentManifest) => {
  // Uso el workspace master y realizo la publicación
  let command_create_workspace = `cd ${manifest.path} && ${commandToUse}`;
  childProcessRunCommandPublish(command_create_workspace);
};

// Método que se encarga de buscar un proyecto en el directorio actual
const searchProjectCurrentDirectory = async () => {
  logger.debug("Use the current location for search one project");
  let response = await findProjectContent([directory]);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProjectContent(files);
      if (!subFiles) {
        process.exit(1);
      } else {
        logger.info(`Project found in the sub location`);
      }
    } else {
      logger.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
};

const findProjectContent = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    publishComponent(manifests[0]);
    return true;
  } else {
    return false;
  }
};
