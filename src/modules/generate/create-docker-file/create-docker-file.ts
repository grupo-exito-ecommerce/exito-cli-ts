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
  if (environemnt == consts.environment.develop) {
    log.info(`Create the docker ${environemnt}`);
    createDevelopDockerFile();
  } else if (environemnt == consts.environment.production) {
    log.info(`Create the docker ${environemnt}`);
    createMasterDockerFile();
  } else {
    log.error("No environment indicate to create the file");
  }
};

const createDevelopDockerFile = async () => {
  try {
    return fs.writeFile(
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
    return fs.writeFile(
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
