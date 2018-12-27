import { Credentials } from "./../../../../shared/interface";
import fs from "fs";
import inquirer from "inquirer";
var _ = require("lodash");
var path = require("path");
var colors = require("colors/safe");

export const setCredentials = async function() {
  const information = await fs.readFileSync(
    path.join(__dirname, "../../../../../config.json"),
    {
      encoding: "utf8"
    }
  );

  let credential = JSON.parse(information);

  if (!_.isEmpty(credential.user)) {
    let credentials = credential;
    return credentials;
  } else {
    console.log(colors.yellow("Enter credentials for AWS"));

    // Get AWS CodeCommit Credential
    const credentials: any = await getCredentials();
    if (credentials) {
      let isSave = await saveCredentials(credentials);
      if (isSave) {
        return credentials;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

// Método para preguntar las credenciales de aws al usuario
export const saveCredentials = function(credentials: Credentials) {
  // let user = {
  //   name: "t-mirestrepo+1-at-402457222534",
  //   pwd: "7AfwNbUdNG9w7BrUFEI+DiFcHlK2sxMe15h307gH8ks="
  // };
  // 1.  Guardo las credenciales indicadas
  fs.writeFile(
    path.join(__dirname, "../../../../../config.json"),
    JSON.stringify({ user: credentials }, null, 2),
    "utf8",
    (e: any) => {
      // error handling and whatever
      console.log(e);
      return false;
    }
  );

  return true;
};

const getCredentials = async function() {
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
    return false;
  }
};
