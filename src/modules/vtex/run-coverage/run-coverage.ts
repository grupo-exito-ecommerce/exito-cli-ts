import log from './../../../shared/logger';
import {
  getDirectories,
  getManifestsContent
} from '../../../shared/util/get-content-files';
import { ContentManifest } from '../../../shared/models/global';
import fs, { writeFileSync } from 'fs';
import { runMultipleCommand } from '../../../shared/util/run-multiple-command';
import {
  getJestConfigContent,
  getSonarQubeContent
} from './util/get-jest-config-content';
const directory = process.cwd() + '/';

export default async function() {
  log.info('Run coverage');
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
        log.info(`Proyect found in the sub location`);
      }
    } else {
      log.warn(`No projects found in ${directory}`);
      process.exit(1);
    }
  }
}

//2. Tomo el directorio encontrado y paso a buscar la carpeta node o react
const findProject = async (files: Array<string>) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  log.debug(`Searchin proyect in ${files}`);
  const manifests: Array<ContentManifest> = await getManifestsContent(files);
  if (manifests.length) {
    log.info(`Proyect found in the folder: ${files}`);
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
  if (fs.existsSync(file + '/node') == true) {
    log.info('Proyect contain the folder node');
    const command = `cd ${file}/node && node ./node_modules/jest/bin/jest.js --coverage -u && cd ../..`;
    await addPercentageOfCoverage(`${file}/node/jest.config.js`);
    await addLoginDataSonarQube(`${file}/node/sonar-project.properties`);
    // Ejecuto el proceso de coverage
    runMultipleCommand(command, [
      `Jest: "global" coverage threshold for`,
      'test failed in'
    ]);
  } else if (fs.existsSync(file + '/react') == true) {
    log.info('Proyect contain the folder react');
    const command = `cd ${file}/react && node ./node_modules/jest/bin/jest.js --coverage -u && ./node_modules/sonar-scanner/bin/sonar-scanner && cd ../..`;
    await addPercentageOfCoverage(`${file}/react/jest.config.js`);
    await addLoginDataSonarQube(`${file}/react/sonar-project.properties`);
    // Ejecuto el proceso de coverage
    runMultipleCommand(command, [
      `Jest: "global" coverage threshold for`,
      'test failed in'
    ]);
  }
};

const writeFileLocal = async (path: string, string: string) => {
  try {
    await writeFileSync(path, string, 'utf8');
    return true;
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

//4. Logica que busca el archivo jest.config.js y agrega la configuración de cobertura minima
const addPercentageOfCoverage = async (dir: string) => {
  try {
    const jest = await getJestConfigContent(dir);
    await writeFileLocal(dir, jest);
    return true;
  } catch (error) {
    log.error(error);
  }
};

//4. Logica que busca el archivo jest.config.js y agrega la configuración de cobertura minima
const addLoginDataSonarQube = async (dir: string) => {
  try {
    const sonar = await getSonarQubeContent(dir);
    await writeFileLocal(dir, sonar);
    return true;
  } catch (error) {
    log.error(error);
  }
};
