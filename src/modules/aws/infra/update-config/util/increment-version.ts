import { writeFileSync } from "fs";
import { ContentManifest } from "./../../../../../shared/models/global";
import log from "../../../../../shared/logger";
import { getManifestsContent } from "../../../../../shared/util/get-content-files";
import { toString } from "ramda";

export const incrementVersion = async (directory: Array<string>) => {
  log.info("Increment versión");

  const content: Array<ContentManifest> = await getManifestsContent(directory);

  await Promise.all(
    content.map(async item => {
      const nexVersion = incrementNumber(item.version);
      log.debug(`current version ${item.version} change to ${nexVersion}`);
      item.version = nexVersion;
      let manifest = Object.assign({}, item);
      delete manifest.path;
      await writeFile(item.path, JSON.stringify(manifest, null, 4));
    })
  );

  return true;
};

// Método que se encarga de incrementar la ultima versión de la aplicación
const incrementNumber = (version: string) => {
  const split = version.split(".");
  split[2] = toString(parseInt(split[2]) + 1);
  const newVersion = `${split[0]}.${split[1]}.${split[2]}`;
  return newVersion;
};

const writeFile = async (path: string, string: string) => {
  try {
    await writeFileSync(path + "/manifest.json", string);
  } catch (error) {
    log.error(error);
  }
};
