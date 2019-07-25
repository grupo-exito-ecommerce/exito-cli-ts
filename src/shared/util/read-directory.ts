import log from "../logger";
import fs from "fs";
import chalk from "chalk";
import { choiseFolders } from "./choise-folders";
import { getDirectories } from "./get-content-files";

export const readDirectoryByFiles = async (
  directory: string,
  criterial: Array<string>,
  message: string,
  action: string
) => {
  log.debug("Read current directory to find the indicate folders");
  // find directory in the current folder
  let currentDirectory: Array<string> = await getDirectories(directory);

  // filter the directory to find the criterial folders
  let filter: Array<string> = currentDirectory.filter((item: string) => {
    let isFound = false;
    criterial.map((crit: string) => {
      if (fs.existsSync(item + `/${crit}`) == true) {
        isFound = true;
      }
    });
    return isFound;
  });

  // print log info
  log.info(
    filter.length > 0
      ? `find ${chalk.redBright(`${filter.length}`)} folders with proyects`
      : `folders not found in the current directory`
  );

  if (filter.length) {
    let choise = await choiseFolders(filter, message, action);
    log.info(
      `Total of proyects to use: ${chalk.whiteBright(
        `${choise.folders.length}`
      )}`
    );
    return choise.folders;
  }

  return [];
};
