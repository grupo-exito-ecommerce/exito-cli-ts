import { consts } from "./../../../../../shared/constants";
import log from "../../../../../shared/logger";
import { runMultipleCommand } from "../../../../../shared/util/run-multiple-command";

export const pushChanges = async (directory: Array<string>) => {
  log.info("Push change and merge in git");
  return Promise.all(
    directory.map(async item => {
      await pushChangesAndMerge(item);
    })
  );
};

// Método que permite hacer push y un merge a develop y master
const pushChangesAndMerge = async (directory: string) => {
  try {
    // comandos empleados para realizar el push
    const pushChanges = `cd ${directory} &&  ${
      consts.git.command_push_changes
    }`;
    const command = `${pushChanges}`;
    await runMultipleCommand(command);

    const mergeChanges = `cd ${directory}  && git checkout develop && git merge origin/feature/aws-infra-update-exito-cli && git push  && git checkout master && git merge origin/develop && git push`;
    await runMultipleCommand(mergeChanges);

    return true;
  } catch (error) {
    return false;
  }
};

// Comando para realizar push  `git add . && git commit -m "exito cli update infra ${getCurrenVersion()} "`
// Comando para realizar merge a develop
// comando para hacer merge de develop a master
