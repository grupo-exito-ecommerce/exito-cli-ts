import { cloneProject } from './aws-commands';
import { AwsExecuteCommandClone, RepositoryOptions } from '../../../../shared/models/global';

export const executeCommands = async (options: AwsExecuteCommandClone): Promise<boolean> => {
  let index = options.position;
  // Recorro la lista de projectos
  if (index < options.projectList.length) {
    // Obtengo el path del projecto, buscando en la lista de manifests
    let optionsCommand: RepositoryOptions = {
      path: options.path,
      credentials: options.credentials,
      project: options.projectList[index],
      branch: options.branch
    };

    let succes = await cloneProject(optionsCommand);

    if (succes) {
      index++;
      let optionsExec: AwsExecuteCommandClone = {
        path: options.path,
        credentials: options.credentials,
        projectList: options.projectList,
        branch: options.branch,
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
