import chalk from "chalk";
import fs from "fs";
import { logger } from "../index";
import { chooseFolders } from "./choose-folders";
import { getDirectories } from "./get-content-files";

export const readDirectoryByFiles = async (
  directory: string,
  criterial: Array<string>,
  message: string,
  action: string
) => {
  logger.debug("Read current directory to find the indicate folders");
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
  logger.info(
    filter.length > 0
      ? `find ${chalk.redBright(`${filter.length}`)} folders with projects`
      : `folders not found in the current directory`
  );

  if (filter.length) {
    let choose = await chooseFolders(filter, message, action);
    logger.info(
      `Total of projects to use: ${chalk.whiteBright(
        `${choose.folders.length}`
      )}`
    );
    return choose.folders;
  }

  return [];
};
