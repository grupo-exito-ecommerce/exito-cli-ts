import { ContentManifest } from "./../../../shared/models/global";
import log from "./../../../shared/logger";
const directory = process.cwd();
import _ from "lodash";
import { readFileInDirectory } from "../../../shared/util/read-file";
import { readDirectoryByFiles } from "../../../shared/util/read-directory";
import { getManifestsContent } from "../../../shared/util/get-content-files";
import { writeFileSync } from "fs";
import { overWriteChangeLogFile } from "./util/overwrite-changelog";

interface TempItem {
  dependencies: object;
  version: string;
  changelog: object;
}

export default async function(criteria: string) {
  log.info("OverWrite dependencies", directory);

  if (!criteria) {
    log.error("Not pass the criteria to use");
    process.exit(1);
  }

  // 1. Obtengo el cotenido del archivo de configuración con las dependencias a actualizar
  const configDependencies: any = await readFileInDirectory(
    `${directory}/update-dependencies.json`,
    false
  );

  if (!configDependencies) {
    process.exit(1);
  }

  // 2. Obtengo la lista de proyectos a emplear, busco los proyectos en el directorio actual.
  const projectsInCurrentDirectory: string[] = await readDirectoryByFiles(
    directory,
    ["manifest.json"],
    "Pick the projects to use",
    "Select the projects"
  );

  // 3. Paso a obtener el contenido de los archivo seleccionados
  let manifestContent: ContentManifest[] = await findProjectContent(
    projectsInCurrentDirectory
  );

  if (!manifestContent.length) {
    log.error("No manifest content");
    process.exit(1);
  }

  // Filtro los proyectos con dependencias vacias
  let filterElements = manifestContent.filter(
    (item: ContentManifest) =>
      Object.getOwnPropertyNames(item.dependencies).length > 0
  );

  log.warn(
    `Found projects with empty dependencies, only use ${
      filterElements.length
    } projects to update dependencies`
  );

  // Recorro los projectos y realizo la actualización de las dependencias. valido si se realizaron los cambios en alguna de las dependencias y preparo el array final para realizar la actualización de los archivos manifest.json
  let manifestUpdate: ContentManifest[] = filterElements.filter(
    (item: ContentManifest) => {
      let dependencies: object = _.pick(
        JSON.parse(configDependencies),
        Object.keys(item.dependencies).filter(item => item.startsWith(criteria))
      );

      if (isEmpty(dependencies)) {
        log.info(
          `No have dependencies in the file update-dependencies.json with the criteria indicate ${criteria}`
        );
        log.warn(`${configDependencies}`);
        log.info("Check the .json file and try again");
      }

      if (
        !isEmpty(dependencies) &&
        !objectEquals(item.dependencies, dependencies, criteria)
      ) {
        let tempItem: TempItem = {
          dependencies,
          version: newVersion(item.version),
          changelog: {
            dependencies
          }
        };

        tempItem.changelog = {
          version: tempItem.version,
          dependencies
        };

        item = _.merge(item, tempItem);
        return item;
      } else {
        log.warn(
          `The dependencies from the project ${item.vendor +
            "." +
            item.name} is already update`
        );
      }
    }
  );

  if (manifestUpdate.length) {
    manifestUpdate.map(async (item: ContentManifest) => {
      // Realizo la escritura del archivo ChangeLog agregando las dependencias modificadas y el número de la versión
      await overWriteChangeLogFile(item.path, item.changelog);
      // Escribo el archivo manifest.json
      await writeFile(item.path, JSON.stringify(removeData(item), null, 4));
    });
  } else {
    log.info("No have projects to update, all projects already are update");
  }
}

// Método que remueve el path del objecto
const removeData = (item: ContentManifest) => {
  delete item.path;
  delete item.changelog;
  return item;
};

function isEmpty(obj: object) {
  return !obj || Object.keys(obj).length === 0;
}

// Método que valida dos arrays para saber si son iguales
function arraysEqual(arr1: any, arr2: any) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--; ) {
    if (arr1[i].key === arr2[i].key && arr1[i].value !== arr2[i].value)
      return false;
  }
  return true;
}

// Método que permite armar un array con key y values, para poder validar si tanto la key como el value son iguales
function objectEquals(objec1: object, object2: object, criteria: string) {
  var output1 = Object.entries(objec1)
    .map(([key, value]) => ({ key, value }))
    .filter(item => item.key.startsWith(criteria));
  var output2 = Object.entries(object2)
    .map(([key, value]) => ({ key, value }))
    .filter(item => item.key.startsWith(criteria));

  return arraysEqual(output1, output2);
}

// Método que genera un cambio en la version pasada
const newVersion = (currentVersion: string) => {
  const items = currentVersion.split(".");
  items[1] = String(Number(items[1]) + 1);
  items[2] = String(Number(0));
  return items.join(".");
};

const findProjectContent = async (files: string[]) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: ContentManifest[] = await getManifestsContent(files);
  if (manifests.length) {
    return manifests;
  } else {
    return [];
  }
};

// Método para escribir el archivo manifest.json
const writeFile = async (path: string, string: string) => {
  try {
    await writeFileSync(path + "/manifest.json", string);
    log.debug(`manifest file update in the directory ${path}`);
  } catch (error) {
    log.error(error);
  }
};
