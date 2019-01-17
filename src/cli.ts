// // import clone from "./modules/aws/clone/clone-projects";
// import { CommandsTypes } from "./shared/constants";
// import log from "./shared/logger";
// import inquirer from "inquirer";
// import { OptCommand, Answer } from "./shared/interface";
// import { runCommand } from "./modules/vtex/command/runCommand";
// import { clearCredentials } from "./modules/aws/config";
// import continuosIntegration from "./modules/vtex/command/continuos-integration";

// // export function to list coffee
// module.exports = async () => {
//   let options: OptCommand;

//   let commands: Answer = await inquirer.prompt([
//     {
//       type: "list",
//       name: "command",
//       message: "Welcome to Exito CLI 🎉",
//       choices: [
//         "Publish components (vtex publish)",
//         "Upload components to vtex (vtex link)",
//         "Clone projects from aws",
//         "Clear saved credentials",
//         "Continuos integration",
//         "Cancel"
//       ]
//     }
//   ]);

//   switch (commands.command) {
//     case "Publish components (vtex publish)":
//       log.info("Running vtex publish");
//       options = {
//         command: CommandsTypes.publish,
//         directory: process.cwd() + "/",
//         orderList: true
//       };

//       runCommand(options);
//       break;

//     case "Upload components to vtex (vtex link)":
//       log.info("Running vtex link");
//       options = {
//         command: CommandsTypes.link,
//         directory: process.cwd() + "/",
//         orderList: true
//       };
//       runCommand(options);
//       break;

//     case "Clone projects from aws":
//       log.info("Obtain projects from AWS");
//       options = {
//         directory: process.cwd() + "/",
//         command: "",
//         orderList: false
//       };
//       // clone(options);
//       break;
//     case "Clear saved credentials":
//       log.info("Clear saved credentials");
//       clearCredentials();
//       break;
//     case "Continuos integration":
//       log.info("Continuos integration");
//       continuosIntegration();
//       break;
//     case "Cancel":
//       log.info("Exit...");
//       break;
//   }
// };
