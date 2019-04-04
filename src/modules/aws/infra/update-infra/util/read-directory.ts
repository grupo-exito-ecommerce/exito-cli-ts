import log from "../../../../../shared/logger";
import { getDirectories } from "../../../../vtex/util/fs";
import fs from 'fs';
import chalk from "chalk";
import { choiseFolders } from "./choise-folders";

export const readDirectory = async (directory: string) => {
    log.debug("Read current directory to find .git folder")
    // find directory in the current folder
    let currentDirectory: any = await getDirectories(directory);

    // filter the directory to find .git folder
    let filter = currentDirectory.filter((item: any) => fs.existsSync(item + '/.git') == true)

    // print log info
    log.info(filter.length > 0 ? `find ${chalk.blue(filter.length)} folders with proyects` : `folder ${chalk.blue('.git')} not found in the current directory`)

    let choise = await choiseFolders(filter)

    log.info(`Total of proyects to use: ${chalk.yellow(`${choise.folders.length}`)}`);

    return choise.folders;
}
