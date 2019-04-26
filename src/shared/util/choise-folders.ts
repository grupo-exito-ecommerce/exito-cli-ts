import inquirer = require("inquirer");
import chalk from "chalk";

interface Folders {
    folders: Array<string>
}

export const choiseFolders = async (
    folderList: Array<string>
): Promise<Folders> => {
    let folders = [
        new inquirer.Separator(`${chalk.yellow('Select the folders to use')} \n`),
        ...folderList
    ];

    const promptCommands: Folders = await inquirer.prompt([
        {
            type: 'checkbox',
            message: `${chalk.greenBright('Pick proyects to link')}`,
            name: 'folders',
            choices: folders
        }
    ]);
    return promptCommands;
};