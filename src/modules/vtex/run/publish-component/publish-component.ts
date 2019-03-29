import { childProcessRunCommand } from './../../../../shared/util/child-process-run-command';
import log from './../../../../shared/logger';

export default async function() {
  log.info('Loading publish component process');

  // 1. Creo el nombre aleatorio del workspace
  let nameWorkspace = getRamdomString();
  log.info(`Creating workspaces ${nameWorkspace}`);
  // 2 Creo el workspace en Vtex, Paso el workspace a producción
  let command_create_workspace = `
  vtex workspace create ${nameWorkspace} -p && 
  vtex workspace use ${nameWorkspace} && 
  vtex publish &&
  vtex workspace use master  && 
  vtex workspace delete ${nameWorkspace} -y
  `;
  log.debug(command_create_workspace)
  childProcessRunCommand(command_create_workspace);
}

// Método que permite la creación de un nombre para el workspaces con un código aleatorio
const getRamdomString = (): string => {
  return `workspace${makeid()}`;
};

function makeid() {
  var text = '';
  var possible =
    'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
