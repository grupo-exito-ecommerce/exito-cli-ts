import chalk from "chalk";
import inquirer from "inquirer";
import { ContentDependencies, logger } from "../../index";

// Método que busca una dependencia e la lista de dependencias filtradas por el usuario
export const findDependency = async (
  dependenciesList: Array<ContentDependencies>
): Promise<Array<any>> => {
  let filterDependencies: any = await chooseDependencies(dependenciesList);
  if (filterDependencies.dependencies) {
    dependenciesList = await dependenciesList.filter(
      (item: ContentDependencies) => {
        let isFind = filterDependencies.dependencies.find((filter: string) => {
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

    logger.info(
      `Total of projects to link: ${chalk.whiteBright(
        `${dependenciesList.length}`
      )}`
    );

    return dependenciesList;
  } else {
    return [];
  }
};

const chooseDependencies = async (
  dependenciesList: Array<ContentDependencies>
) => {
  let dependencies = [
    new inquirer.Separator(
      `${chalk.whiteBright("Select the projects to use")} \n`
    ),
    ...dependenciesList
  ];

  const promptCommands: Array<ContentDependencies> = await inquirer.prompt([
    {
      type: "checkbox",
      message: `${chalk.redBright("Pick projects to link")}`,
      name: "dependencies",
      choices: dependencies
    }
  ]);
  return promptCommands;
};
