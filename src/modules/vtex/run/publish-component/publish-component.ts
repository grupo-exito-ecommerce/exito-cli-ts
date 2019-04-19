import { ContentManifest } from "./../../../../shared/models/global";
import { childProcessRunCommand } from "./../../../../shared/util/child-process-run-command";
import log from "./../../../../shared/logger";
import {
  getManifestsContent,
  getDirectories
} from "../../../../shared/util/get-content-files";
const directory = process.cwd() + "/";

export default async function() {
  log.info("Loading publish component process");
  searchProjectCurrentDirectory();
}

const publishComponent = (manifest: ContentManifest) => {
  // Uso el workspace master y realizo la publicación
  let command_create_workspace = `cd ${
    manifest.path
  } && vtex workspace use master && vtex publish --verbose`;
  childProcessRunCommand(command_create_workspace);
};

// Método que se encarga de buscar un proyecto en el directorio actual
export const searchProjectCurrentDirectory = async () => {
  log.debug("Use the current location for search one project");
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

export const findProjectContnet = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    publishComponent(manifests[0]);
    return true;
  } else {
    return false;
  }
};
