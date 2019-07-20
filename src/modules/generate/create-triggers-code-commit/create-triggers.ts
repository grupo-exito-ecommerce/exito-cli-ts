import { consts } from "./../../../shared/constants";
import {
  CreateTriggerCodeCommit,
  BranchTriggerInformation
} from "./../../../shared/models/global";
import log from "./../../../shared/logger";
import { readDirectoryByFiles } from "../../../shared/util/read-directory";
import { getRepositoryName } from "../../../shared/util/get-repository-name";
import { getTemplateContent } from "./util/get-template";
import { readFileInDirectory } from "../../../shared/util/read-file";
const dirname = process.cwd();
const { codeCommitTriggerDir } = consts.code_commit;
let fs = require("fs");

/**
 * Este archivo realiza la creación de la estructura base para el tema de la aplicación.
 * recibe como parametro el nombre del tema que se va a emplear
 *
 */
export default async (destinationArn: string) => {
  log.info("Creating aws triggers configuration");

  // Generación de la configuración de branch y schema
  const branch: BranchTriggerInformation[] = await readFileInDirectory(
    `${dirname}/trigger-config.json`,
    true
  );
  
  if (branch.length <= 0) {
    process.exit(1);
  }

  // 1. Leo el directorio actual y permito seleccionar todos los proyectos deseados
  const currentDirectory: Array<string> = await readDirectoryByFiles(
    dirname,
    ["manifest.json"],
    "Pick the projects to use",
    "Select the projects"
  );

  // 2. Obtengo los nombres de los proyectos. en base al nombre de la carpeta
  let repositoryNames: Array<string> = getProyectNames(currentDirectory);

  // 2. Armo el objeto que contendra los recursos de codecommit y codebuild. ademas de la información basica para el codepipeline
  repositoryNames.map(nameProyect => {
    const config: CreateTriggerCodeCommit = {
      codeCommitProyect: nameProyect,
      branchs: branch,
      destinationArn: destinationArn,
      updateReference: ["updateReference"]
    };

    // change the url to clone with the current name
    let copy: any = JSON.stringify(config.branchs);
    copy = JSON.parse(copy);
    copy.map((item: BranchTriggerInformation) => {
      item.customData.url_to_clone += `/${nameProyect}`;
    });
    config.branchs = copy;
    createAwsTemplate(config);
  });
};

// Método que recorre la lista de proyectos y obtiene el nombre a emplear de acuerdo a la carpeta.
const getProyectNames = (currentDirectory: Array<string>) => {
  let repositoryNames: Array<string> = [];
  currentDirectory.map(async (item: string) => {
    repositoryNames.push(getRepositoryName(item));
  });

  return repositoryNames;
};

const createAwsTemplate = async (config: CreateTriggerCodeCommit) => {
  await ensureDirectoryExistence(dirname);
  await ensureDirectoryExistence(dirname + `/${codeCommitTriggerDir}`);

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
const createTemplate = async (options: CreateTriggerCodeCommit) => {
  const template = await getTemplateContent(options);
  return fs.writeFile(
    `${dirname}/${codeCommitTriggerDir}/${options.codeCommitProyect}.json`,
    template,
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
