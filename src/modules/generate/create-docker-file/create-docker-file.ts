import { DockerConfiguration } from "./../../../shared/models/global";
let fs = require("fs");
import log from "./../../../shared/logger";
import { consts } from "../../../shared/constants";
import { developDocker } from "./util/docker-develop-template";
import { masterDocker } from "./util/docker-master-template";
const dirname = process.cwd();
let options: DockerConfiguration;

export default async (
  environemnt: string,
  vendor: string,
  workspace: string,
  email: string
) => {
  // 0 Set config
  options = {
    vendor: vendor,
    email: email,
    workspace: workspace
  };

  // 1. Create the file in base to the selection 'dev' or 'production
  log.info(`Creating the docker file ${environemnt}`);

  if (environemnt == consts.environment.develop) {
    await createDevelopDockerFile();
    log.info("Docker file creation successfully");
  } else if (environemnt == consts.environment.production) {
    await createMasterDockerFile();
    log.info("Docker file creation successfully");
  } else {
    log.error("No environment indicate to create the docker file");
  }
};

const createDevelopDockerFile = async () => {
  try {
    return fs.writeFileSync(
      `${dirname}/${consts.generate.develop_dockerfile_name}`,
      await developDocker(options),
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

const createMasterDockerFile = async () => {
  try {
    return fs.writeFileSync(
      `${dirname}/${consts.generate.master_dockerfile_name}`,

      await masterDocker(options),
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
