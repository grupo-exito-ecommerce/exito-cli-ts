import { ConfigVtexJson } from './../../../shared/models/global';
import log from '../../../shared/logger';
import { runOnlyCommand } from '../util/run-command-child-process';
import { getConfigTemplate } from './util/config-template';
const axios = require('axios')
let fs = require('fs');

const getAuth = async () => {
  try {
    return await axios.get('https://demoauth--exito.myvtex.com/exito/token')
  } catch (error) {
    console.error(error)
  }
}

export default async function () {
  log.info('Login process vtex');
  const auth = await getAuth()
  if (auth) {
    log.info(auth.data)
    const vtexDirConfig = await runOnlyCommand('find  ~/.config/configstore/vtex.json')
    log.info(vtexDirConfig)

    const options: ConfigVtexJson = {
      account: "exito",
      authToken: auth.data,
      workspase: "production",
      login: 'mrestrepoa@grupo-exito.com'
    }
    
    // 1. Find the directory of the file for config vtex

    // 2. Overrite the config file from vtex
    // mrestrepoa@grupo-exito.com
    // exito
    // production
   await  overriteFIle(vtexDirConfig,options)
   console.log("finish write file")
  }
};


/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const overriteFIle = async (dirname:string,options: ConfigVtexJson) => {
  return fs.writeFile(`${dirname.replace(/\s/g,'')}`,
    await getConfigTemplate(options),
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};

