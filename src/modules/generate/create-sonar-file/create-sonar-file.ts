import { consts } from "./../../../shared/constants";
let fs = require("fs");
import log from "./../../../shared/logger";
import { sonarTemplate } from "./util/sonar-template";
const { configDir, sonarDir } = consts.aws_template;
const dirname = process.cwd() + `/${configDir}`;
const chalk = require("chalk");

export default async (repository: string, version: string, src: string) => {
  log.info(`Creating the sonar file`);
  try {
    await ensureDirectoryExistence(dirname);
    await ensureDirectoryExistence(dirname + `/${sonarDir}`);
    log.info(
      `${chalk.blue("name")} ${repository} ${chalk.blue(
        "version"
      )} ${version} ${chalk.blue("directory")} ${src}`
    );
    await fs.writeFileSync(
      `${dirname}/${sonarDir}/sonar-project.properties`,
      await sonarTemplate(repository, version, src),
      function(err: string) {
        if (err) {
          throw err;
        }
      }
    );

    log.info("Sonar file created succesfully.");
  } catch (error) {
    log.debug("error" + error);
  }
};

const ensureDirectoryExistence = async (filePath: string): Promise<Boolean> => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  await fs.mkdirSync(filePath);
  return true;
};
