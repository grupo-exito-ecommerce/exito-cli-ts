import axios from "axios";
import chalk from "chalk";
import ora from "ora";
import { ConfigVtexJson, logger } from "./../../../../shared";
import { saveVtexConfig } from "./util/save-credentials";

// Call to get auth information
const getAuth = async (workspace: string, account: string, token: string) => {
  try {
    const url = `https://${workspace}--${account}.myvtex.com/exito/token?credentials=${token}?config=${makeId()}`;
    logger.debug(url);
    return await axios.get(url);
  } catch (error) {
    logger.debug(error);
    logger.error("Error on get auth token");
    process.exit(1);
  }
};

function makeId() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default async function(
  account: string,
  workspace: string,
  email: string,
  token: string
) {
  const spinner = ora("Getting auth token \n").start();
  spinner.stop();
  const auth = await getAuth(workspace, account, token);
  spinner.start();

  if (auth) {
    const authToken: string = auth.data;

    // print information
    spinner.succeed(
      `auth token to use: ${chalk.redBright(authToken.slice(1, 20))}...`
    );

    logger.info(
      `Credentials for use ${chalk.redBright(account)} as ${chalk.redBright(
        email
      )} at workspace ${chalk.redBright(workspace)}`
    );

    // options for the file config.json
    const options: ConfigVtexJson = {
      account: account,
      token: authToken,
      workspace: workspace,
      login: email,
      env: "prod"
    };

    // 1. Overrite the config file from vtex
    await saveVtexConfig(options);

    spinner.succeed(`Now you logged in Vtex!!`);
  } else {
    spinner.fail("No token information found.");
    process.exit(1);
  }
}
