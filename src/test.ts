import inquirer from "inquirer";

const run = async () => {
  var questions = [
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

  let response = await inquirer.prompt(questions);
  console.log(response);
};

run();
