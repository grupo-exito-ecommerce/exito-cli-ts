import { getCurrenVersion } from "./../../../../conf";
import { DockerConfiguration } from "./../../../../shared/models/global";

export const masterDocker = (options: DockerConfiguration) => {
  return `# exito cli version ${getCurrenVersion()}
FROM node:8

# Install dependencies
RUN yarn global add vtex && yarn cache clean
RUN yarn global add exito && yarn cache clean

COPY ./ /project

WORKDIR /project

RUN echo "Publish project in the workspace ${
    options.workspace
  } with the account ${options.vendor}"

RUN exito generate vtex_json --verbose

RUN exito vtex set_vendor ${options.vendor} --verbose

RUN exito vtex login ${options.vendor} ${options.workspace} ${
    options.email
  } --verbose

RUN exito vtex publish --verbose
`;
};
