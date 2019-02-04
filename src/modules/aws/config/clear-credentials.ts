import log from "../../../shared/logger";
import inquirer from "inquirer";
import { setCredentials } from "./util/set-credentials";

export default async () => {
  let questions = [
    {
      type: "confirm",
      name: "confirm",
      message: "Are your sure?",
      default: false
    }
  ];

  inquirer.prompt(questions).then(async answers => {
    let result: any = answers;
    if (result.confirm) {
      let response = await setCredentials();
      if (response) {
        log.info("Credentials has been removed");
      } else {
        log.error("Error on removed credentilas");
      }
    }
  });
};
