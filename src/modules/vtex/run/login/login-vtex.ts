import { consts } from './../../../../shared/constants';
import { ConfigVtexJson } from './../../../../shared/models/global';
import log from './../../../../shared/logger';
import { getConfigTemplate } from './util/config-template';
import { runOnlyCommand } from '../../../../shared/util/run-only-command';
import axios from 'axios';
let fs = require('fs');
import chalk from 'chalk';
import ora from 'ora';

// Call to get auth information
const getAuth = async (workspace: string) => {
  try {
    log.debug(`https://${workspace + consts.authtoken}?config=${makeid()}`);
    return await axios.get(
      `https://${workspace + consts.authtoken}?config=${makeid()}`
    );
  } catch (error) {
    log.error(error);
  }
};

function makeid() {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default async function(
  account: string,
  workspace: string,
  email: string
) {
  const spinner = ora('Getting auth token \n').start();
  spinner.start();
  const auth = await getAuth(workspace);

  if (auth) {
    const authToken: string = auth.data;

    // print information
    spinner.succeed(
      `auth token to use: ${chalk.redBright(authToken.slice(1, 20))}...`
    );

    log.info(
      `Credentials for use ${chalk.redBright(account)} as ${chalk.redBright(
        email
      )} at workspace ${chalk.redBright(workspace)}`
    );

    // 1. Find the directory of the file for config vtex
    const vtexDirConfig = await runOnlyCommand(
      'find  ~/.config/configstore/vtex.json'
    );

    if (!vtexDirConfig) {
      log.error('Error on fin the config file of vtex');
    } else {
      // print the current ubication from the file config vtex.json
      log.debug(
        `vtex.json ubication: ${chalk.redBright(
          vtexDirConfig.replace(/\s/g, '')
        )}`
      );

      // options for the file config.json
      const options: ConfigVtexJson = {
        account: account,
        authToken: authToken,
        workspase: workspace,
        login: email
      };

      // 2. Overrite the config file from vtex
      await overwriteFile(vtexDirConfig, options);
      spinner.succeed(`Now you logged in Vtex!!`);
    }
  } else {
    spinner.fail('No token information found.');
    process.exit(1);
  }
}

/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const overwriteFile = async (dirname: string, options: ConfigVtexJson) => {
  try {
    // remove white spaces in the path
    return fs.writeFile(
      `${dirname.replace(/\s/g, '')}`,
      await getConfigTemplate(options),
      function(err: string) {
        if (err) {
          throw err;
        }
      }
    );
  } catch (error) {
    log.debug('error' + error);
  }
};
