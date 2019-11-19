import { runMultipleCommand, logger } from "../../../../shared";

export const runGitCommand = async (
  directory: string[],
  commandToUse: string
) => {
  logger.info(`Running ${commandToUse}`);
  return Promise.all(
    directory.map(async item => {
      logger.debug(`${directory} --> Command: ${commandToUse}`);
      await executeGitCommand(item, commandToUse);
    })
  );
};

// Método que permite crear el feature en el proyecto indicado.
const executeGitCommand = async (directory: string, commandToUse: string) => {
  try {
    const command = `cd ${directory} && ${commandToUse}`;
    const response = await runMultipleCommand(command);
    return response;
  } catch (error) {
    return false;
  }
};
