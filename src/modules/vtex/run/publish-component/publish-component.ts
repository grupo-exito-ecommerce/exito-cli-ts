import { childProcessRunCommand } from "./../../../../shared/util/child-process-run-command";
import log from "./../../../../shared/logger";

export default async function() {
  log.info("Loading publish component process");
  // Uso el workspace master y realizo la publicación
  let command_create_workspace = `vtex workspace use master && vtex publish`;
  childProcessRunCommand(command_create_workspace);
}
