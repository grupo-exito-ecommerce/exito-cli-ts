import log from "../logger";
import chalk from "chalk";
import { getFilesInCurrentDirectory } from "./get-content-files";
import { chooseFolders } from "./choose-folders";
var path = require("path");

export const readDirectoryByExtension = async (
  directory: string,
  criterial: Array<string>,
  message: string,
  action: string
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
      ? `find ${chalk.redBright(`${filter.length}`)} files with the extension`
      : `files with the indicate extension not found in the current directory`
  );

  if (filter.length) {
    let choose = await chooseFolders(filter, message, action);
    log.info(
      `Total of files to use: ${chalk.whiteBright(`${choose.folders.length}`)}`
    );
    return choose.folders;
  }

  return [];
};
