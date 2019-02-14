import log from '../../../shared/logger';
import { ncp } from 'ncp';

const configDirectory: string = __dirname + '/resources';

export default async () => {
  try {
    log.info('Generating the last config for your project');
    let firstCopy = await move(configDirectory, process.cwd() + '/');
    if (firstCopy) {
      log.info('files config generate succesfully!!');
    } else {
      log.error('error on generate files config');
    }
  } catch (error) {
    log.debug(error)
  }
};

const move = (source: string, destination: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      ncp(source, destination, (err: Error) => {
        if (err) {
          reject(false);
        }
        resolve(true);
      });
    } catch (error) {
      log.debug(error)
    }
  });
};
