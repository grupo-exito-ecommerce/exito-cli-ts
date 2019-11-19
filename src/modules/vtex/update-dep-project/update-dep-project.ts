import { ContentManifest, getDirectories, getManifestContent, getManifestsContent, logger, runMultipleCommand } from "./../../../shared";
const directory = process.cwd();

export default async function() {
  //1. Busco en el directorio actual si existen proyectos con el archivo manifest.json
  let response = await findProjectContent([directory]);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProjectContent(files);
      if (!subFiles) {
        process.exit(1);
      }
    } else {
      logger.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
}

const findProjectContent = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    logger.info("Get manifest information");
    const content: ContentManifest = await getManifestContent(directory);
    if (content) {
      let commandToUse = `vtex deps update ${content.vendor}.${content.name}@${content.version}`;
      await runMultipleCommand(commandToUse);
    }
    return true;
  } else {
    return false;
  }
};
