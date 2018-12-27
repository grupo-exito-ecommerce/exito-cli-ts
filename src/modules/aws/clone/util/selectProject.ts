import { RepositoryList } from "./../../../../shared/interface";
import log from "../../../../shared/logger";
import inquirer from "inquirer";

// Método que busca una dependencia e la lista de dependencias filtradas por el usuario
export const findDependency = async (projectList: any) => {
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

    log.info(`Projects to clone: ${projectList.length}`);
    return projectList;
  } else {
    return false;
  }
};

const choiseDependencies = async (projectList: Array<RepositoryList>) => {
  let dependencies = [
    new inquirer.Separator("\n = Projects list = \n"),
    ...projectList
  ];

  const promptCommands = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Pick The Project to clone",
      name: "projects",
      choices: dependencies
    }
  ]);

  return promptCommands;
};
