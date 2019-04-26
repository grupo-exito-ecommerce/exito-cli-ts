import log from "../logger";
import chalk from "chalk";
import { choiseFolders } from "./choise-folders";
import { getFilesInCurrentDirectory } from "./get-content-files";
var path = require("path");

export const readDirectoryByExtension = async (
  directory: string,
  criterial: Array<string>
) => {
  log.debug("Read current directory to find the indicate extensions files");
  // find directory in the current folder
  let currentDirectory: Array<string> = await getFilesInCurrentDirectory(
    directory
  );

  // filter the directory to find the criterial folders
  let filter: Array<string> = currentDirectory.filter((item: string) => {
    let isFound = false;
    criterial.map((crit: string) => {
      if (path.extname(item) == crit) {
        isFound = true;
      }
    });
    return isFound;
  });

  // print log info
  log.info(
    filter.length > 0
      ? `find ${chalk.blue(`${filter.length}`)} files with the extension`
      : `files with the indicate extension not found in the current directory`
  );

  if (filter.length) {
    let choise = await choiseFolders(filter);
    log.info(
      `Total of files to use: ${chalk.yellow(`${choise.folders.length}`)}`
    );
    return choise.folders;
  }

  return [];
};
