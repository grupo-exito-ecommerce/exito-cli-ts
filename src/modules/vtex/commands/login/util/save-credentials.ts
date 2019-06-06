
const Configstore = require('configstore');
import log from './../../../../../shared/logger';
import { ConfigVtexJson } from './../../../../../shared/models/global';

export const saveVtexConfig = async (configuration:ConfigVtexJson) => {
  try {
    const conf =   new Configstore('vtex');
    await conf.clear();
    conf.all = configuration
    log.info('vtex json save succefully');
  } catch (error) {
    log.error('Error on save the vtex file');
    process.exit(1);
  }
};
