import log from "./../../../../shared/logger";
import { readFileInDirectory } from "../../../../shared/util/read-file";
import { writeFileSync } from "fs";
import * as pkg from "./../../../../../package.json";

export const overWriteChangeLogFile = async (
  directory: string,
  changelogInfo: any
) => {
  log.info("OverWrite Changelog", directory);

  // 1. Obtengo el cotenido del archivo Changelog
  let changeLogData: any = await readFileInDirectory(
    `${directory}/CHANGELOG.md`,
    false
  );

  // Reemplazo el contenido del changelog agregando las dependencias modificadas y la version asignada junto a la fecha y la version de la cli que realizo el cambio.
  let replaceInfo = changeLogData.replace(
    "## [Unreleased]",
    `## [Unreleased]
    
## [${changelogInfo.version}] - ${getCurrentDate()}
  
### Changed
  
- Update in the following dependencies with the version of exito: ${pkg.version}
- ${JSON.stringify(changelogInfo.dependencies, null, 4)}`
  );

  await writeFile(`${directory}/CHANGELOG.md`, replaceInfo);
};

function getCurrentDate() {
  return new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "-");
}

// Método para escribir el archivo manifest.json
const writeFile = async (path: string, string: string) => {
  try {
    await writeFileSync(path, string);
    log.debug(`Changelog file update in the directory ${path}`);
  } catch (error) {
    log.error(error);
  }
};
