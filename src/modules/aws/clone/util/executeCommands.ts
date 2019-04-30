import { cloneProject } from './aws-commands';

export const executeCommands = async (options: any): Promise<boolean> => {
  let index = options.position;

  // Recorro la lista de projectos
  if (index < options.projectList.length) {
    // Obtengo el path del projecto, buscando en la lista de manifests
    let optionsCommand: any = {
      command: options.commands,
      path: options.path,
      credentials: options.credentials,
      project: options.projectList[index]
    };

    let succes = await cloneProject(optionsCommand);

    if (succes) {
      index++;
      let optionsExec = {
        command: options.commands,
        path: options.path,
        credentials: options.credentials,
        projectList: options.projectList,
        position: index
      };
      return executeCommands(optionsExec);
    } else {
      return false;
    }
  } else {
    return true;
  }
};

module.exports = {
  executeCommands
};
