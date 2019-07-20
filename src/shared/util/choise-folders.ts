import inquirer = require("inquirer");
import chalk from "chalk";

interface Folders {
  folders: Array<string>;
}

export const choiseFolders = async (
  folderList: Array<string>,
  message: string,
  action: string
): Promise<Folders> => {
  let folders = [
    new inquirer.Separator(`${chalk.whiteBright(action)} \n`),
    ...folderList
  ];

  const promptCommands: Folders = await inquirer.prompt([
    {
      type: "checkbox",
      message: `${chalk.redBright(message)}`,
      name: "folders",
      choices: folders
    }
  ]);
  return promptCommands;
};
