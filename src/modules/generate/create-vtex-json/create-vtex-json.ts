const Configstore = require('configstore');
import log from './../../../shared/logger';

export default async () => {
  try {
    new Configstore('vtex', { workspace: 'production' });
    log.info('vtex json generate succefully');
  } catch (error) {
    log.error('Error on generate the vtex file');
    process.exit(1);
  }
};
