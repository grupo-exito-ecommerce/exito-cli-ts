import { DockerConfiguration } from "./../../../../shared/models/global";
import { getCurrenVersion } from "../../../../conf";

export const developDocker = (options: DockerConfiguration) => {
  return `# exito cli version ${getCurrenVersion()}
FROM node:8

# Install dependencies
RUN yarn global add vtex && yarn cache clean
RUN yarn global add exito && yarn cache clean

COPY ./ /project

WORKDIR /project/

RUN echo "Uploading project in the workspace ${options.workspace}"

RUN exito generate vtex_json --verbose

RUN exito vtex login ${options.vendor} ${options.workspace} ${
    options.email
  } --verbose

RUN exito vtex set_vendor ${options.vendor} --verbose

RUN exito vtex run link all --verbose

RUN echo "Project successfully uploaded in the workspace ${options.workspace}"`;
};
