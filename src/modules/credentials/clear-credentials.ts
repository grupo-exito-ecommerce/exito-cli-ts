import inquirer from "inquirer";
import { clear } from "../../conf";
import { logger } from "../../shared";

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
      clear();
      logger.info("Credentials has been removed");
    }
  });
};
