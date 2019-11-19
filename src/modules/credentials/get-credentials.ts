import { logger, AwsCredentials } from "../../shared";
import { getAwsAccount } from "../../conf";
import chalk from "chalk";

export default async () => {
  try {
    // Get the current credentials
    let credential: AwsCredentials = getAwsAccount();
    if (credential) {
      logger.info(
        `current credentials for aws: user ${chalk.redBright(
          credential.username
        )} password ${chalk.redBright(credential.pwd)}`
      );
    } else {
      logger.debug(
        "No have aws credentials, save your aws credentials for clone projects"
      );
    }
  } catch (e) {
    logger.debug(e);
  }
};
