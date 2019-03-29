import { consts } from './../../../shared/constants';
import { ConfigVtexJson } from './../../../shared/models/global';
import log from '../../../shared/logger';
import { runOnlyCommand } from '../util/run-command-child-process';
import { getConfigTemplate } from './util/config-template';
const axios = require('axios')
let fs = require('fs');
const chalk = require('chalk');

// Call to get auth information
const getAuth = async () => {
  try {
    return await axios.get(consts.authtoken)
  } catch (error) {
    console.error(error)
  }
}

export default async function (account: string, workspace: string, email: string) {
  const auth = await getAuth()

  if (auth) {
    const authToken = auth.data;

    // print information
    log.debug("auth token to use:" + authToken)
    log.info(`Credentials for use ${chalk.blue(account)} as ${chalk.green(email)} at workspace ${chalk.green(workspace)}`)

    // 1. Find the directory of the file for config vtex
    const vtexDirConfig = await runOnlyCommand('find  ~/.config/configstore/vtex.json')

    if (!vtexDirConfig) {
      log.error("Error on fin the config file of vtex")
    } else {
      // print the current ubication from the file config vtex.json
      log.debug(`Vtex config file ubicate in the folder: ${chalk.green(vtexDirConfig.replace(/\s/g, ''))}`)

      // options for the file config.json
      const options: ConfigVtexJson = {
        account: account,
        authToken: authToken,
        workspase: workspace,
        login: email
      }

      // 2. Overrite the config file from vtex
      await overwriteFile(vtexDirConfig, options)

      log.info("Vtex.json file successfully overwritten, now you logged in Vtex!!")
    }
  } else {
    log.error("No token information found.")
  }
};


/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const overwriteFile = async (dirname: string, options: ConfigVtexJson) => {
  try {
    // remove white spaces in the path
    return fs.writeFile(`${dirname.replace(/\s/g, '')}`,
      await getConfigTemplate(options),
      function (err: string) {
        if (err) {
          throw err;
        }
      }
    );
  } catch (error) {
    log.debug("error" + error)
  }
};

