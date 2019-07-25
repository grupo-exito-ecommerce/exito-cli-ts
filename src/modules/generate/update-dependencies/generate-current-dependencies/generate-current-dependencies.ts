import log from "./../../../../shared/logger";
import { readFileInDirectory } from "../../../../shared/util/read-file";
const directory = process.cwd();
import _ from "lodash";
let fs = require("fs");

export default async function (criteria: string) {
  // 1. Leer el archivo .json y lista las dependencias filtradas de acuerdo al cricterio de busqueda, permite seleccionar las dependencias a emplear y genera un archivo config.json con las dependencias a emplear y su versión.
  log.info("Find .json file in the current directory");

  // 1. Leo el directorio actual y permito seleccionar todos los proyectos deseados
  if (criteria) {
    log.info(`Use the criteria ${criteria}`);
  }

  // Generación de la configuración de branch y schema
  const fileContent: string = await readFileInDirectory(
    `${directory}/current-dependencies.json`,
    false
  );

  let currentDependencies: string[] = [];
  let filter = Object.keys(JSON.parse(fileContent))
    .reverse()
    .filter(item => {
      const element = item.split("@");
      currentDependencies.push(element[0]);
      return item;
    });


  let formatFilter = filter.reduce(function (prev: any, cur) {
    const split = cur.split("@");
    if (prev[split[0]]) {
      prev[split[0]] += '-' + split[1];
    }
    else { prev[split[0]] = split[1]; }
    return prev;
  }, {});

  createFileConfig(formatFilter);
}

/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const createFileConfig = async (dependencies: string[]) => {
  return fs.writeFile(
    `${directory}/update-dependencies.json`,
    JSON.stringify(dependencies, null, 4),
    function (err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
