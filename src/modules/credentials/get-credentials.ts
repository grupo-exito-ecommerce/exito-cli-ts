import log from '../../shared/logger';
import { AwsCredentials } from './../../shared/models/global';
import { getAwsAccount } from '../../conf';
import chalk from 'chalk';

export default async () => {
  try {
    // Get the current credentials
    let credential: AwsCredentials = getAwsAccount();
    if (credential) {
      log.info(
        `current credentials for aws: user ${chalk.redBright(
          credential.username
        )} password ${chalk.redBright(credential.pwd)}`
      );
    } else {
      log.debug(
        'No have aws credentials, save your aws credentials for clone projects'
      );
    }
  } catch (e) {
    log.debug(e);
  }
};
