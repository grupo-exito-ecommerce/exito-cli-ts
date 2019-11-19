import { readDirectoryByExtension } from "./../../../shared/util/read-files-extension";
import log from "../../../shared/logger";
import { runOnlyCommand } from "../../../shared/util/run-only-command";
import { getRepositoryName } from "../../../shared/util/get-repository-name";

export const runTriggers = async (commandToRun: string) => {
  const directory = process.cwd() + "/";
  log.info(directory);

  // 1. Leo el directorio actual y permito seleccionar todos los proyectos deseados
  const currentDirectory: Array<string> = await readDirectoryByExtension(
    directory,
    [".json"],
    "Pick the file to use",
    "Select the .json file to use"
  );

  const projectsList = getProjectNames(currentDirectory);

  executeTriggerUpdate(projectsList, commandToRun);
};

// Método que recorre la lista de proyectos y obtiene el nombre a emplear de acuerdo a la carpeta.
const getProjectNames = (currentDirectory: Array<string>) => {
  let repositoryNames: Array<string> = [];
  currentDirectory.map(async (item: string) => {
    repositoryNames.push(getRepositoryName(item.replace(".json", "")));
  });

  return repositoryNames;
};

const executeTriggerUpdate = (
  projectsList: Array<string>,
  commandToRun: string
) => {
  try {
    projectsList.map(async (name: string) => {
      //a function that returns a promise
      const command = `aws codecommit ${commandToRun} --repository-name ${name} --cli-input-json file://${name}.json`;
      await runOnlyCommand(command);
      log.debug("Finish Running: " + name);
    });
  } catch (error) {
    log.error("Error on update trigger: " + error);
  }
};
