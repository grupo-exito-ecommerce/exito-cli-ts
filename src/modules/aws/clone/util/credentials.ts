import fs from "fs";
import inquirer from "inquirer";
var _ = require("lodash");
var path = require("path");
import log from "../../../../shared/logger";
const filePath = "../../../../../config.json";
import { Credentials } from "./../../../../shared/interface";
const emptyUser: Credentials = {
  username: "",
  pwd: ""
};

const message =
  "No have aws credentials, save your aws credentials for clone projects";

export const setCredentials = async (): Promise<Credentials> => {
  try {
    const exist = await fs.existsSync(path.join(__dirname, filePath));
    if (exist) {
      // Do something if the file exist
      const information = await fs.readFileSync(
        path.join(__dirname, filePath),
        {
          encoding: "utf8"
        }
      );

      let credential: { user: Credentials } = JSON.parse(information);

      if (!_.isEmpty(credential.user)) {
        let credentials = credential;
        return credentials.user;
      } else {
        log.debug(message);
        return await requireCredentials();
      }
    } else {
      log.debug(message);
      return await requireCredentials();
    }
  } catch (e) {
    log.debug(e);
    return emptyUser;
  }
};

export const requireCredentials = async (): Promise<Credentials> => {
  log.info("Enter credentials for AWS");
  // Get AWS CodeCommit Credential
  const credentials: Credentials = await getCredentials();
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

// Método para preguntar las credenciales de aws al usuario
export const saveCredentials = (credentials: Credentials): Boolean => {
  // 1.  Guardo las credenciales indicadas
  fs.writeFile(
    path.join(__dirname, "../../../../../config.json"),
    JSON.stringify({ user: credentials }, null, 2),
    "utf8",
    (e: any) => {
      // error handling and whatever
      log.debug(e);
      return false;
    }
  );
  return true;
};

/**
 *  Metodo empleado para realizar la solicitud de las credenciales al usuario
 */
const getCredentials = async (): Promise<Credentials> => {
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

  let response: Credentials = await inquirer.prompt(questions);

  if (response) {
    return response;
  } else {
    return emptyUser;
  }
};
