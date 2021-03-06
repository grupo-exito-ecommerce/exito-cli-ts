import { writeFileSync } from "fs";
import _ from "lodash";
import { ContentManifestOverwrite, getManifestsContent, logger, readDirectoryByFiles, readFileInDirectory } from "../../../shared";
import { overWriteChangeLogFile } from "./util/overwrite-changelog";
const directory = process.cwd();

interface TempItem {
  dependencies: object;
  version: string;
  changelog?: {
    dependencies: object
    version: string
  };
}

export default async function (criteria: string) {
  logger.info("OverWrite dependencies", directory);

  if (!criteria) {
    logger.error("Not pass the criteria to use");
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
  let manifestContent: ContentManifestOverwrite[] = await findProjectContent(
    projectsInCurrentDirectory
  );

  if (!manifestContent.length) {
    logger.error("No manifest content");
    process.exit(1);
  }

  // Filtro los proyectos con dependencias vacias
  let filterElements = manifestContent.filter(
    (item: ContentManifestOverwrite) =>
      Object.getOwnPropertyNames(item.dependencies).length > 0
  );

  logger.warn(
    `Found projects with empty dependencies, only use ${
    filterElements.length
    } projects to update dependencies`
  );

  // Recorro los projectos y realizo la actualización de las dependencias. valido si se realizaron los cambios en alguna de las dependencias y preparo el array final para realizar la actualización de los archivos manifest.json
  let manifestUpdate: ContentManifestOverwrite[] = filterElements.filter(
    (item: ContentManifestOverwrite) => {
      let dependencies: object = _.pick(
        JSON.parse(configDependencies),
        Object.keys(item.dependencies).filter(item => item.startsWith(criteria))
      );

      // EL Objecto `dependencies` posee la lista de dependencias a actualizar. este es un objecto con las versiones a emplear
      if (isEmpty(dependencies)) {
        logger.info(
          `No have dependencies in the file update-dependencies.json with the criteria indicate ${criteria}`
        );
        logger.warn(`${configDependencies}`);
        logger.info("Check the .json file and try again");
      }

      // Si las dependencias actuales son diferentes a las que se preparan para modificar
      if (
        !isEmpty(dependencies) &&
        !objectEquals(item.dependencies, dependencies, criteria)
      ) {

        // Lógica que permite capturar la ultima versión en base a la versión actual que posee el proyecto.
        // Hay dependencias que pueden tener mas de una versión, ejem "vtex.render-server": "8.47.2-7.39.0"
        // Lo que se hace es obtener un array en base a las versiones disponibles de una versión [8.47.2,7.39.0]
        // Si se indica que se emplee la ultima versión siempre con la variable lastVersion, se pasa a emplear la ultima versión que sería 8.47.2

        // Si no se indica que se emplee la ultima versión, se pasa a realizar una busqueda de la ultima versión en base a la versión actual
        // [8.47.2,7.39.0]  de la versión actual que es 8.x. con lo que trae la versión 8.47.2, si se indica la versión 7.x se trae la ultima versión pero de 7.39.0
        let dependenciesToUse: object = {}

        // Variable que arma un objeto en base a las keys filstradas por el cricterio, arma el objeto con key y value, para así obtener la lista de depencias a emplear
        const filterDependencies: object = Object.keys(item.dependencies)
          .filter((key) => key.startsWith(criteria))
          .reduce((obj: any, key: string) => {
            obj[key] = item.dependencies[key];
            return obj;
          }, {});

        // Variable que contiene la lista de dependencias final a emplear, esto ya que puedo realizar el filtro del objeto filterDependencies y remover keys que no van a ser necesarias para emplear.
        let filterDependenciesToUse = filterDependencies;

        Object.keys(dependencies).map((itemDependencies: string, index) => {

          // Variable que contiene la lista de versiones a emplear de la dependencia
          let listVersion: any = Object.values(dependencies)[index].split('-')
          let versionToUse: any = listVersion[0]

          // Capturo el flag para saber si empleo la ultima versión siempre o no.
          const LASTVERSION = '--last';
          const lastVersion = process.argv.indexOf(LASTVERSION) >= 0;

          // Si no se indica que se use la ultima versión y el número de versiones es mayor o igual a 2
          if (!lastVersion && listVersion.length >= 2) {
            versionToUse = listVersion.find((val: string) => val.startsWith(Object.values(filterDependencies)[index].split('.')[0]))

            if (!versionToUse) {
              // Remuevo la dependencia que no se encontro de acuerdo a la versión empleada actualmente, esto permite validar si la dependnecia actual existe pero la version solicitada no existe.
              filterDependenciesToUse = _.omit(filterDependencies, itemDependencies);
            }
          }

          if (versionToUse) {
            dependenciesToUse = {
              ...dependenciesToUse, [itemDependencies]: versionToUse
            }
          }

          return item
        })

        // Si la lista de depenencias con la versión validada se encuentra null, paso a mostrar mensaje indicando que no hay versiones a emplear
        if (!isEmpty(dependenciesToUse) && !objectEquals(filterDependenciesToUse, dependenciesToUse, criteria)) {
          let tempItem: TempItem = {
            dependencies: dependenciesToUse,
            version: newVersion(item.version),
          };

          // Paso a crear una variable que contiene la versión y la lista de depencias
          tempItem.changelog = {
            version: tempItem.version,
            dependencies: dependenciesToUse
          };

          item = _.merge(item, tempItem);
          return item;
        } else {
          logger.warn(
            `The dependencies from the project ${item.vendor +
            "." +
            item.name} is already update`
          );
        }

      } else {
        logger.warn(
          `The dependencies from the project ${item.vendor +
          "." +
          item.name} is already update`
        );
      }
    }
  );

  if (manifestUpdate.length) {
    manifestUpdate.map(async (item: ContentManifestOverwrite) => {
      // Realizo la escritura del archivo ChangeLog agregando las dependencias modificadas y el número de la versión
      await overWriteChangeLogFile(item.path, item.changelog);
      // Escribo el archivo manifest.json
      await writeFile(item.path, JSON.stringify(removeData(item), null, 4));
    });
  } else {
    logger.info("No have projects to update, all projects already are update");
  }
}


// Método que remueve el path del objecto
const removeData = (item: ContentManifestOverwrite) => {
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
  for (var i = arr1.length; i--;) {
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
  const manifests: ContentManifestOverwrite[] = await getManifestsContent(files);
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
    logger.debug(`manifest file update in the directory ${path}`);
  } catch (error) {
    logger.error(error);
  }
};
