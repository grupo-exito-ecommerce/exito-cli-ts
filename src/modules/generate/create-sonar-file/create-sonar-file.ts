import { configuration, logger } from "./../../../shared";
let fs = require("fs");
import { sonarTemplate } from "./util/sonar-template";
const { configDir, sonarDir } = configuration.aws_template;
const dirname = process.cwd() + `/${configDir}`;
import chalk from "chalk";

export default async (repository: string, version: string, src: string) => {
  logger.info(`Creating the sonar file`);
  try {
    await ensureDirectoryExistence(dirname);
    await ensureDirectoryExistence(dirname + `/${sonarDir}`);
    logger.info(
      `${chalk.redBright("name")} ${repository} ${chalk.redBright(
        "version"
      )} ${version} ${chalk.redBright("directory")} ${src}`
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

    logger.info("Sonar file created successfully.");
  } catch (error) {
    logger.debug("error" + error);
  }
};

const ensureDirectoryExistence = async (filePath: string): Promise<Boolean> => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  await fs.mkdirSync(filePath);
  return true;
};
