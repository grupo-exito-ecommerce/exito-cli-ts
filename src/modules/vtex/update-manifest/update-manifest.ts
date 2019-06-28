import { ContentManifest } from "./../../../shared/models/global";
import log from "./../../../shared/logger";
import { getManifestContent, getManifestsContent, getDirectories } from "../../../shared/util/get-content-files";
import { writeFileSync } from "fs";
const directory = process.cwd();

export default async function (vendor: string) {

  //1. Busco en el directorio actual si existen proyectos con el archivo manifest.json
  let response = await findProjectContnet([directory], vendor);
  // si no se encontraron projectos en el directorio actual, paso a buscar en los sub directorios.
  if (!response) {
    // obtengo todos los nombres de las carpetas dentro del directorio indicado
    let files: Array<string> = await getDirectories(directory);
    if (files.length) {
      let subFiles = await findProjectContnet(files, vendor);
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
}

const findProjectContnet = async (files: Array<string>, vendor: string) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    log.info("Update manifest information");
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
    log.info("manifest file update.");
  } catch (error) {
    log.error(error);
  }
};
