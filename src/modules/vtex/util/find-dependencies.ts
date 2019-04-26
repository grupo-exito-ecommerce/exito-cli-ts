import chalk from "chalk";
import { ContentDependencies } from '../../../shared/models/global';
import inquirer from 'inquirer';
import log from '../../../shared/logger';

// Método que busca una dependencia e la lista de dependencias filtradas por el usuario
export const findDependency = async (
  dependenciesList: Array<ContentDependencies>
): Promise<Array<any>> => {
  let filderDependencies: any = await choiseDependencies(dependenciesList);
  if (filderDependencies.dependencies) {
    dependenciesList = await dependenciesList.filter(
      (item: ContentDependencies) => {
        let isFind = filderDependencies.dependencies.find((filter: string) => {
          // Valido si la dependencia ha sido seleccionada, si no esta seleccionda. armo un array solo con dependencias selecionadas
          if (item.value == filter) {
            return true;
          } else {
            return false;
          }
        });
        return isFind;
      }
    );

    log.info(`Total of proyects to link: ${chalk.yellow(`${dependenciesList.length}`)}`);

    return dependenciesList;
  } else {
    return [];
  }
};

const choiseDependencies = async (
  dependenciesList: Array<ContentDependencies>
) => {
  let dependencies = [
    new inquirer.Separator(`${chalk.yellow('Select the proyects to use')} \n`),
    ...dependenciesList
  ];

  const promptCommands: Array<ContentDependencies> = await inquirer.prompt([
    {
      type: 'checkbox',
      message: `${chalk.greenBright('Pick proyects to link')}`,
      name: 'dependencies',
      choices: dependencies
    }
  ]);
  return promptCommands;
};
