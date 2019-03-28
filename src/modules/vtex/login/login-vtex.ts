import { ConfigVtexJson } from './../../../shared/models/global';
import log from '../../../shared/logger';
import { runOnlyCommand } from '../util/run-command-child-process';
import { getConfigTemplate } from './util/config-template';
const axios = require('axios')
let fs = require('fs');

const getAuth = async () => {
  try {
    return await axios.get('https://exito.myvtex.com/exito/token')
  } catch (error) {
    console.error(error)
  }
}

export default async function (account:string,workspace:string, email: string ) {
  log.info('Login process vtex');
  const auth = await getAuth()
  if (auth) {
    const authToken = auth.data;
    log.debug("auth token to use:" + authToken)
    log.debug(`\n Credentials for use: \n account:${account} workspace:${workspace} email:${email}`)
    // 1. Find the directory of the file for config vtex
    const vtexDirConfig = await runOnlyCommand('find  ~/.config/configstore/vtex.json')
    log.info('Vtex config file ubicate in the folder: ' + vtexDirConfig.replace(/\s/g, ''))

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
};


/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const overwriteFile = async (dirname: string, options: ConfigVtexJson) => {
  // remove white spaces in the path
  return fs.writeFile(`${dirname.replace(/\s/g, '')}`,
    await getConfigTemplate(options),
    function (err: string) {
      if (err) {
        throw err;
      }
    }
  );
};

