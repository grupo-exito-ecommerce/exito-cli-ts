import { consts } from "./../../../shared/constants";
import { CreateTriggerCodeCommit } from "./../../../shared/models/global";
import log from "./../../../shared/logger";
import { readDirectoryByFiles } from "../../../shared/util/read-directory";
import { getRepositoryName } from "../../../shared/util/get-repository-name";
import { getTemplateContent } from "./util/get-template";
const dirname = process.cwd();
const { cloudFormationDir } = consts.aws_template;
let fs = require("fs");

/**
 * Este archivo realiza la creación de la estructura base para el tema de la aplicación.
 * recibe como parametro el nombre del tema que se va a emplear
 *
 */
export default async (destinationArn: string) => {
  log.info("Creating aws triggers configuration");

  // 1. Leo el directorio actual y permito seleccionar todos los proyectos deseados
  const currentDirectory: Array<string> = await readDirectoryByFiles(dirname, [
    "manifest.json"
  ]);

  // 2. Obtengo los nombres de los proyectos. en base al nombre de la carpeta
  let repositoryNames: Array<string> = getProyectNames(currentDirectory);

  // 2. Armo el objeto que contendra los recursos de codecommit y codebuild. ademas de la información basica para el codepipeline

  // remuevo puntos del nombre ingresado, esto genera error en aws
  // const nameRepositoryFormat = nameConfig.replace(".", "-");
  const urlToClone = "https://git-codecommit.us-east-1.amazonaws.com/v1/repos/";

  repositoryNames.map(nameProyect => {
    let config: CreateTriggerCodeCommit = {
      codeCommitProyect: nameProyect,
      branchs: [
        {
          name: "develop",
          customData: {
            code_build: "exito-vtex-deploy-develop",
            vendor: "exito",
            workspace: "dev",
            code_commit_branch: "develop",
            docker_environment: "dev",
            url_to_clone: urlToClone + nameProyect
          }
        },
        {
          name: "master",
          customData: {
            code_build: "exito-vtex-deploy-master",
            vendor: "exito",
            workspace: "master",
            code_commit_branch: "master",
            docker_environment: "prod",
            url_to_clone: urlToClone + nameProyect
          }
        }
      ],
      destinationArn: destinationArn,
      updateReference: ["updateReference"]
    };

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
const createTemplate = async (options: CreateTriggerCodeCommit) => {
  return fs.writeFile(
    `${dirname}/${cloudFormationDir}/${options.codeCommitProyect}.json`,
    await getTemplateContent(options),
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
