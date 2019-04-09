import { ContentManifest } from "./../../../../../shared/models/global";
import { consts } from "./../../../../../shared/constants";
import log from "../../../../../shared/logger";
import { runMultipleCommand } from "../../../../../shared/util/run-multiple-command";
import { getManifestContent } from "../../../../../shared/util/get-content-files";
const fs = require("fs");

export const updateConfigContinuosIntegration = (directory: Array<string>) => {
  log.info("Update continuos integration config");

  return Promise.all(
    directory.map(async (dir: string) => {
      // 1. Elimino la carpeta config
      await deletConfigFolder(dir);

      // 2. Creo la carpeta config
      await createConfigFolder(dir);

      // 3. Creo el template de aws.
      await createTemplateFiles(dir);

      // 4. Creo el archivo de sonar
      await createSonarFiles(dir);
    })
  );
};

const createConfigFolder = async (directory: string) => {
  log.debug("creating folder config.");
  return await runMultipleCommand(
    `cd ${directory} && ${consts.exito.command_generate_config}`
  );
};

const deletConfigFolder = async (directory: string) => {
  log.debug("deleting current folder.");
  return await deleteFolderRecursive(directory + "/config");
};

const createSonarFiles = async (directory: string) => {
  log.debug("creating sonar configuration.");
  const repositoryName = await getRepositoryName(directory);
  const manifest: ContentManifest = await getManifestContent(directory);
  return await runMultipleCommand(
    `cd ${directory} && ${
      consts.exito.command_generate_sonar
    } ${repositoryName} ${manifest.version} ${consts.exito.default_src}`
  );
};

const createTemplateFiles = async (directory: string) => {
  log.debug("creating templates for aws.");
  const repositoryName = await getRepositoryName(directory);
  return await runMultipleCommand(
    `cd ${directory} && ${
      consts.exito.command_generate_tempalte
    } ${repositoryName}`
  );
};

// Método que retorna el nombre del repositorios, se realiza obteniendo el nombre de la carpeta donde se enuentra el proyecto. por estandar lo manejamos de acuerdo al nombre del repositorio.
const getRepositoryName = (directory: string) => {
  const dir = directory.split("/");
  return dir[dir.length - 1];
};

// Método para eliminar la carpeta config
const deleteFolderRecursive = function(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file: string) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
