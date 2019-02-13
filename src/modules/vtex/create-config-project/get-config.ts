import log from '../../../shared/logger';
var ncp = require('ncp').ncp;
const configDirectory: string = __dirname + '/resources';

ncp.limit = 16;

export default async () => {
  log.info('Generating the last config for your project');
  let firstCopy = await move(configDirectory, process.cwd() + '/');
  if (firstCopy) {
    log.info('files config generate succesfully!!');
  } else {
    log.error('error on generate files config');
  }
};

const move = (source: string, destination: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ncp(source, destination, function(err: string) {
      if (err) {
        reject(false);
      }
      resolve(true);
    });
  });
};
