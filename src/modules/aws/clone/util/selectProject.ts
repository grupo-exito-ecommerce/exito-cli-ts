import { RepositoryList } from './../../../../shared/models/global';
import log from '../../../../shared/logger';
import inquirer from 'inquirer';
import chalk from 'chalk';

// Método que busca una dependencia e la lista de dependencias filtradas por el usuario
export const findDependency = async (
  projectList: any
): Promise<Array<RepositoryList>> => {
  if (projectList.length) {
    let filderDependencies: any = await choiseDependencies(projectList);
    if (filderDependencies.projects) {
      projectList = await projectList.filter((item: any) => {
        let isFind = filderDependencies.projects.find((filter: string) => {
          if (item.value == filter) {
            return true;
          } else {
            return false;
          }
        });
        return isFind;
      });

      log.info(`Proyects to clone: ${chalk.redBright(projectList.length)}`);
      return projectList;
    } else {
      return [];
    }
  } else {
    log.debug('No projects found with the criteria specific');
    return [];
  }
};

const choiseDependencies = async (projectList: Array<RepositoryList>) => {
  let dependencies = [
    new inquirer.Separator(
      `${chalk.whiteBright('Select the projects to clone')} \n`
    ),
    ...projectList
  ];

  const promptCommands = await inquirer.prompt([
    {
      type: 'checkbox',
      message: `${chalk.redBright('Pick The Project to clone')}`,
      name: 'projects',
      choices: dependencies
    }
  ]);

  return promptCommands;
};
