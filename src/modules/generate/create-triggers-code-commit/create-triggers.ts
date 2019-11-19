import { BranchTriggerInformation, configuration, CreateTriggerCodeCommit, getRepositoryName, logger, readDirectoryByFiles, readFileInDirectory } from "./../../../shared";
import { getTemplateContent } from "./util/get-template";
const dirname = process.cwd();
const { codeCommitTriggerDir } = configuration.code_commit;
let fs = require("fs");

/**
 * Este archivo realiza la creación de la estructura base para el tema de la aplicación.
 * recibe como parametro el nombre del tema que se va a emplear
 *
 */
export default async (destinationArn: string) => {
  logger.info("Creating aws triggers configuration");

  // Generación de la configuración de branch y schema
  const branch: BranchTriggerInformation[] = await readFileInDirectory(
    `${dirname}/trigger-config.json`,
    true
  );

  if (!branch) {
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
  let repositoryNames: Array<string> = getProjectNames(currentDirectory);

  // 2. Armo el objeto que contendra los recursos de codecommit y codebuild. ademas de la información basica para el codepipeline
  repositoryNames.map(nameProject => {
    const config: CreateTriggerCodeCommit = {
      codeCommitProject: nameProject,
      branches: branch,
      destinationArn: destinationArn,
      updateReference: ["updateReference"]
    };

    // change the url to clone with the current name
    let copy: any = JSON.stringify(config.branches);
    copy = JSON.parse(copy);
    copy.map((item: BranchTriggerInformation) => {
      item.customData.urlToClone += `/${nameProject}`;
      item.customData.linkCommand = item.customData.linkCommand.replace(
        /\s+/g,
        "@S"
      );
      item.customData.publishCommand = item.customData.publishCommand.replace(
        /\s+/g,
        "@S"
      );
      item.customData.linkCommand = item.customData.linkCommand.replace(
        /\&&+/g,
        "@AND"
      );
      item.customData.publishCommand = item.customData.publishCommand.replace(
        /\&&+/g,
        "@AND"
      );
    });
    config.branches = copy;
    createAwsTemplate(config);
  });
};

// Método que recorre la lista de proyectos y obtiene el nombre a emplear de acuerdo a la carpeta.
const getProjectNames = (currentDirectory: Array<string>) => {
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
    `${dirname}/${codeCommitTriggerDir}/${options.codeCommitProject}.json`,
    template,
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
