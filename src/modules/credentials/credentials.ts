// import fs from "fs";
// import inquirer from "inquirer";
// let _ = require("lodash");
// let path = require("path");
// import log from "../../shared/logger";
// const filePath = "../../../config.json";
// import { AwsCredentials } from "./../../shared/models/global";
// import { saveCredentials } from "../credentials/set-credentials";
// const emptyUser: AwsCredentials = {
//   username: "",
//   pwd: ""
// };

// const message =
//   "No have aws credentials, save your aws credentials for clone projects";

// export const setCredentials = async (): Promise<AwsCredentials> => {
//   try {
//     const exist = await fs.existsSync(path.join(__dirname, filePath));
//     if (exist) {
//       // Do something if the file exist
//       const information = await fs.readFileSync(
//         path.join(__dirname, filePath),
//         {
//           encoding: "utf8"
//         }
//       );

//       let credential: { user: AwsCredentials } = JSON.parse(information);

//       if (!_.isEmpty(credential.user)) {
//         let credentials = credential;
//         return credentials.user;
//       } else {
//         log.debug(message);
//         return await requireCredentials();
//       }
//     } else {
//       log.debug(message);
//       return await requireCredentials();
//     }
//   } catch (e) {
//     log.debug(e);
//     return emptyUser;
//   }
// };

// export const requireCredentials = async (): Promise<AwsCredentials> => {
//   log.info("Enter credentials for AWS");
//   // Get AWS CodeCommit Credential
//   const credentials: AwsCredentials = await promptCredentials();
//   if (credentials.username !== "") {
//     let isSave = await saveCredentials(credentials);
//     if (isSave) {
//       return credentials;
//     } else {
//       return emptyUser;
//     }
//   } else {
//     return emptyUser;
//   }
// };

// /**
//  *  Metodo empleado para realizar la solicitud de las credenciales al usuario
//  */
// const promptCredentials = async (): Promise<AwsCredentials> => {
//   const questions = [
//     {
//       type: "input",
//       name: "username",
//       message: "What is your AWS CodeCommit username?"
//     },
//     {
//       type: "input",
//       name: "pwd",
//       message: "What is your password"
//     }
//   ];

//   let response: AwsCredentials = await inquirer.prompt(questions);

//   if (response) {
//     return response;
//   } else {
//     return emptyUser;
//   }
// };
