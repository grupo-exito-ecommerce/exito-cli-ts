import inquirer = require('inquirer');
import chalk from 'chalk';

interface Folders {
  folders: Array<string>;
}

export const choiseFolders = async (
  folderList: Array<string>
): Promise<Folders> => {
  let folders = [
    new inquirer.Separator(
      `${chalk.whiteBright('Select the folders to use')} \n`
    ),
    ...folderList
  ];

  const promptCommands: Folders = await inquirer.prompt([
    {
      type: 'checkbox',
      message: `${chalk.redBright('Pick proyects to link')}`,
      name: 'folders',
      choices: folders
    }
  ]);
  return promptCommands;
};
