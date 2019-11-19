import { writeFileSync } from "fs";
import { ContentManifest, getDirectories, getManifestContent, getManifestsContent, logger } from "./../../../shared";
const directory = process.cwd();

export default async function (vendor: string) {

  //1. Busco en el directorio actual si existen proyectos con el archivo manifest.json
  let response = await findProjectContent([directory], vendor);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProjectContent(files, vendor);
      if (!subFiles) {
        process.exit(1);
      }
    } else {
      logger.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
}

const findProjectContent = async (files: Array<string>, vendor: string) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    logger.info("Update manifest information");
    const content: ContentManifest = await getManifestContent(directory);
    if (content) {
      updateManifestInfo(content, vendor);
    }
    return true;
  } else {
    return false;
  }
};


const updateManifestInfo = async (
  manifest: ContentManifest,
  vendor: string
) => {
  manifest.vendor = vendor;
  let manifestCopy = Object.assign({}, manifest);
  delete manifestCopy.path;
  await writeFile(manifest.path, JSON.stringify(manifestCopy, null, 4));
};

const writeFile = async (path: string, string: string) => {
  try {
    await writeFileSync(path + "/manifest.json", string);
    logger.info("manifest file update.");
  } catch (error) {
    logger.error(error);
  }
};
