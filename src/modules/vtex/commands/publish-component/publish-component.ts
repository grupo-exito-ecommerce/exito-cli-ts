import { ContentManifest } from './../../../../shared/models/global';
import log from './../../../../shared/logger';
import {
  getManifestsContent,
  getDirectories
} from '../../../../shared/util/get-content-files';
import { childProcessRunCommandPublish } from './utill/child-process-publish';
const directory = process.cwd() + '/';

let commandToUse = ""

export default async function (command: string) {

  // Capturo el flag para saber si empleo la ultima versión siempre o no.
  const SCAPECOMMAND = '--scape';
  const scapeCommand = process.argv.indexOf(SCAPECOMMAND) >= 0;
  commandToUse = command;

  if (scapeCommand) {
    commandToUse = command.replace(/\@S+/g, ' ');
    commandToUse = commandToUse.replace(/\@AND+/g, '&&');
  }
  
  log.debug(`Command to run: ${commandToUse}`);
  log.info('Loading publish component process');
  searchProjectCurrentDirectory();
}

const publishComponent = (manifest: ContentManifest) => {
  // Uso el workspace master y realizo la publicación
  let command_create_workspace = `cd ${manifest.path} && ${commandToUse}`;
  childProcessRunCommandPublish(command_create_workspace);
};

// Método que se encarga de buscar un proyecto en el directorio actual
const searchProjectCurrentDirectory = async () => {
  log.debug('Use the current location for search one project');
  let response = await findProjectContnet([directory]);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProjectContnet(files);
      if (!subFiles) {
        process.exit(1);
      } else {
        log.info(`Proyect found in the sub location`);
      }
    } else {
      log.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
};

const findProjectContnet = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    publishComponent(manifests[0]);
    return true;
  } else {
    return false;
  }
};
