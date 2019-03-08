import { consts } from './../../../shared/constants';
import { download } from './../../github/init/git';
import log from '../../../shared/logger';

export default async () => {
  try {
    log.info('Generating the last config for your project');
    let firstCopy = await move();
    if (firstCopy) {
      log.info('files config generate succesfully!!');
    } else {
      log.error('error on generate files config');
    }
  } catch (error) {
    log.debug(error);
  }
};

const move = async (): Promise<Boolean> => {
  try {
    return await download(consts.config_repository);
  } catch (error) {
    log.error(`Error on download config ${error}`);
    return false;
  }
};
