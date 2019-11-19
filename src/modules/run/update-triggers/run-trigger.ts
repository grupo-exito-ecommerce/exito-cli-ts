import { getProjectNames, logger, readDirectoryByExtension } from "../../../shared";
import { runOnlyCommand } from "../../../shared/util/run-only-command";

export const runTriggers = async (commandToRun: string) => {
  const directory = process.cwd() + "/";
  logger.info(directory);

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

const executeTriggerUpdate = (
  projectsList: Array<string>,
  commandToRun: string
) => {
  try {
    projectsList.map(async (name: string) => {
      //a function that returns a promise
      const command = `aws codecommit ${commandToRun} --repository-name ${name} --cli-input-json file://${name}.json`;
      await runOnlyCommand(command);
      logger.debug("Finish Running: " + name);
    });
  } catch (error) {
    logger.error("Error on update trigger: " + error);
  }
};
