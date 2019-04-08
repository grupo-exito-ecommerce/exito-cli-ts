import { consts } from "./../../../../../shared/constants";
import log from "../../../../../shared/logger";
import { runOnlyCommand } from "../../../../../shared/util/run-only-command";

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
    const command = `cd ${directory} &&  ${consts.git.command_push_changes} `;
    const response = await runOnlyCommand(command);
    return response;
  } catch (error) {
    return false;
  }
};

// Comando para realizar push  `git add . && git commit -m "exito cli update infra ${getCurrenVersion()} "`
// Comando para realizar merge a develop
// comando para hacer merge de develop a master
