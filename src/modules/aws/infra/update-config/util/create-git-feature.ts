import { consts } from "./../../../../../shared/constants";
import log from "../../../../../shared/logger";
import { runMultipleCommand } from "../../../../../shared/util/run-multiple-command";

export const createGitFeature = async (directory: Array<string>) => {
  log.info("Creating feature git");
  return Promise.all(
    directory.map(async item => {
      await createFeatureBranch(item);
    })
  );
};

export const deleteGitFeature = async (directory: Array<string>) => {
  log.info("Deleting feature git");
  return Promise.all(
    directory.map(async item => {
      await deleteRepo(item);
    })
  );
};

// Método que permite crear el feature en el proyecto indicado.
const createFeatureBranch = async (directory: string) => {
  try {
    const command = `cd ${directory} &&  ${consts.git.command_create_feature} ${
      consts.git.namefeature
    }`;
    const response = await runMultipleCommand(command);
    return response;
  } catch (error) {
    return false;
  }
};

export const deleteRepo = async (directory: string) => {
  const deleteRepo = `cd ${directory} && git branch -d ${
    consts.git.namefeature
  } && git push origin --delete ${consts.git.namefeature}`;
  await runMultipleCommand(deleteRepo);
};
