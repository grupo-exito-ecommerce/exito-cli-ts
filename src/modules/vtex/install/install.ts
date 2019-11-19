import fs from "fs";
import { ContentManifest, getDirectories, getManifestsContent, logger, runMultipleCommand } from "./../../../shared";
const directory = process.cwd() + "/";
let commandAdminPackage: string = "";

export default async (adminPackage: string) => {
  logger.info("Install dependencies");

  commandAdminPackage = adminPackage;
  //1. Busco en el directorio actual si existen proyectos con el archivo manifest.json
  let response = await findProject([directory]);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProject(files);
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

//2. Tomo el directorio encontrado y paso a buscar la carpeta node o react
const findProject = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  logger.debug(`Searching project in ${files}`);
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    logger.info(`Project found in the folder: ${files}`);
    manifests.map((item: ContentManifest) => {
      findNodeOrReactFolder(item.path);
    });
    return true;
  } else {
    return false;
  }
};

//3. De acuerdo al directorio encontrado, paso a realizar la instalación de las dependencias
const findNodeOrReactFolder = async (file: string) => {
  if (fs.existsSync(file + "/node") == true) {
    logger.info("Project contain the folder node");
    const command = `cd ${file}/node && ${commandAdminPackage} && cd ../..`;
    runMultipleCommand(command);
  } else if (fs.existsSync(file + "/react") == true) {
    logger.info("Project contain the folder react");
    const command = `cd ${file}/react && ${commandAdminPackage} && cd ../..`;
    runMultipleCommand(command);
  }
};
