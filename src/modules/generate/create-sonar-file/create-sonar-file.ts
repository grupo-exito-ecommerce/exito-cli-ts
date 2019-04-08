import { consts } from "./../../../shared/constants";
let fs = require("fs");
import log from "./../../../shared/logger";
import { sonarTemplate } from "./util/sonar-template";
const { configDir, sonarDir } = consts.aws_template;
const dirname = process.cwd() + `/${configDir}`;

export default async (repository: string) => {
  log.info(`Create the sonar file`);
  try {
    await ensureDirectoryExistence(dirname);
    await ensureDirectoryExistence(dirname + `/${sonarDir}`);

    return fs.writeFile(
      `${dirname}/${sonarDir}/sonar-project.properties`,
      await sonarTemplate(repository),
      function(err: string) {
        if (err) {
          throw err;
        }
      }
    );
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
