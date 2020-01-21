import * as inquirer from "inquirer";
import { keys, prop } from "ramda";
import { configuration, logger } from "./../../../shared";
import * as git from "./git";

const templates: any = {
  "hello react typescript": "hello-react-ts",
  "get started with react + redux + sagas": "react-with-redux",
  "graphql get started": "graphql-getstarted"
};

const promptTemplates = async (): Promise<string> => {
  const cancel = "Cancel";
  const chosen: any = prop<string>(
    "service",
    await inquirer.prompt({
      name: "service",
      message: configuration.messages.gitInitProject,
      type: "list",
      choices: [...keys(templates), cancel]
    })
  );
  if (chosen === cancel) {
    logger.info(configuration.messages.gitInitClose);
    return process.exit();
  }
  return chosen;
};

const promptContinue = async () => {
  const promt: any = await inquirer.prompt({
    name: "proceed",
    message: `You are about to remove all files in ${process.cwd()}. Do you want to continue?`,
    type: "confirm"
  });
  const proceed = prop("proceed", promt);

  if (!proceed) {
    logger.info(configuration.messages.gitInitClose);
    process.exit();
  }
};

export default async () => {
  logger.debug("Prompting for app info");
  logger.info(configuration.messages.gitInitHellow);
  try {
    const repo = templates[await promptTemplates()];

    console.log(repo);
    await promptContinue();
    logger.info(`Cloning https://${configuration.github_account}s/${repo}.git`);
    git.clone(repo);
  } catch (err) {
    logger.error(err.message);
    err.printStackTrace();
  }
};
