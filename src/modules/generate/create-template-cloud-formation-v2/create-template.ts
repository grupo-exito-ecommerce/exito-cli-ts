import { consts } from "./../../../shared/constants";
import { CreateTemplateCloudFormation } from "./../../../shared/models/global";
import log from "./../../../shared/logger";
import { readDirectoryByFiles } from "../../../shared/util/read-directory";
import { getRepositoryName } from "../../../shared/util/get-repository-name";
import { getTemplateContent } from "./util/get-template";
const dirname = process.cwd();
const { codeBuild, codePipeline, cloudFormationDir } = consts.aws_template;
let fs = require("fs");

/**
 * Este archivo realiza la creación de la estructura base para el tema de la aplicación.
 * recibe como parametro el nombre del tema que se va a emplear
 *
 */
export default async (
  nameConfig: string,
  branchName: string,
  ymlDirectory: string
) => {
  log.info("Creating aws cloud-formation template");

  log.info(dirname);
  // 1. Leo el directorio actual y permito seleccionar todos los proyectos deseados
  const currentDirectory: Array<string> = await readDirectoryByFiles(dirname, [
    "manifest.json"
  ]);

  // 2. Obtengo los nombres de los proyectos. en base al nombre de la carpeta
  let repositoryNames: Array<string> = getProyectNames(currentDirectory);

  // 2. Armo el objeto que contendra los recursos de codecommit y codebuild. ademas de la información basica para el codepipeline

  // remuevo puntos del nombre ingresado, esto genera error en aws
  const nameRepositoryFormat = nameConfig.replace(".", "-");

  let config: CreateTemplateCloudFormation = {
    codeCommitProyects: repositoryNames,
    nameBranch: branchName,
    buildSpecDir: ymlDirectory,
    codeBuildName: `${nameRepositoryFormat}-${codeBuild}-${branchName}`,
    codePipeLineName: `${nameRepositoryFormat}-${codePipeline}-${branchName}`
  };

  createAwsTemplate(config);
};

// Método que recorre la lista de proyectos y obtiene el nombre a emplear de acuerdo a la carpeta.
const getProyectNames = (currentDirectory: Array<string>) => {
  let repositoryNames: Array<string> = [];
  currentDirectory.map(async (item: string) => {
    repositoryNames.push(getRepositoryName(item));
  });

  return repositoryNames;
};

const createAwsTemplate = async (config: CreateTemplateCloudFormation) => {

  await ensureDirectoryExistence(dirname);
  await ensureDirectoryExistence(dirname + `/${cloudFormationDir}`);

  await createTemplate(config);
};

const ensureDirectoryExistence = async (filePath: string): Promise<Boolean> => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  await fs.mkdirSync(filePath);
  return true;
};

/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const createTemplate = async (options: CreateTemplateCloudFormation) => {
  return fs.writeFile(
    `${dirname}/${cloudFormationDir}/${options.nameBranch}.json`,
    await getTemplateContent(options),
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
