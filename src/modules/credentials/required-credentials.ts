import inquirer from "inquirer";
import { getAwsAccount } from "../../conf";
import { AwsCredentials, logger } from "./../../shared";
import { saveCredentials } from "./set-credentials";
const emptyUser: AwsCredentials = {
  username: "",
  pwd: ""
};

export const PrompCredentials = async (): Promise<AwsCredentials> => {
  try {
    // Get the current credentials
    let credential: AwsCredentials = getAwsAccount();
    if (credential) {
      return credential;
    } else {
      logger.debug(
        "No have aws credentials, save your aws credentials for clone projects"
      );
      return await requireCredentials();
    }
  } catch (e) {
    logger.debug(e);
    return emptyUser;
  }
};

export const requireCredentials = async (): Promise<AwsCredentials> => {
  logger.info("Enter credentials for AWS");
  // Get AWS CodeCommit Credential
  const credentials: AwsCredentials = await promptCredentials();
  if (credentials.username !== "") {
    let isSave = await saveCredentials(credentials);
    if (isSave) {
      return credentials;
    } else {
      return emptyUser;
    }
  } else {
    return emptyUser;
  }
};

/**
 *  Metodo empleado para realizar la solicitud de las credenciales al usuario
 */
const promptCredentials = async (): Promise<AwsCredentials> => {
  const questions = [
    {
      type: "input",
      name: "username",
      message: "What is your AWS CodeCommit username?"
    },
    {
      type: "input",
      name: "pwd",
      message: "What is your password"
    }
  ];

  let response: AwsCredentials = await inquirer.prompt(questions);

  if (response) {
    return response;
  } else {
    return emptyUser;
  }
};
