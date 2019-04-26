import { childProcessRunCommand } from './../../../shared/util/child-process-run-command';
import log from './../../../shared/logger';
import inquirer from 'inquirer';
import { consts } from './../../../shared/constants';

interface QuestionModel {
  develop: string;
  qa: string;
  quantity: number;
}
export default async function() {
  log.info('Enter the options to create the workspace config');

  let questions = [
    {
      type: 'input',
      name: 'develop',
      message: 'develop workspace name',
      default: 'develop',
      validate: function(value: string) {
        let valid = value.length >= 3;
        return (
          valid ||
          `Invalid workspace name: ${value}. Must be at least 3 characters, only lowercase alphanumeric, single dashes (-) or underlines (_)`
        );
      }
    },
    {
      type: 'input',
      name: 'qa',
      message: 'qa workspace name',
      default: 'qa',
      validate: function(value: string) {
        let valid = value.length >= 2;
        return (
          valid ||
          `Invalid workspace name: ${value}. Must be at least 2 characters, only lowercase alphanumeric, single dashes (-) or underlines (_)`
        );
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'number of workspace for qa',
      validate: function(value: any) {
        let valid = !isNaN(parseFloat(value));
        if (!(parseFloat(value) > 0)) {
          return 'Please enter a number diferent of 0';
        } else {
          return valid || 'Please enter a number';
        }
      },
      filter: Number
    }
  ];

  // Cuando obtenga la respuesta de la validacion de los campo, paso a realizar una confirmación de los comandos a ejecutar
  inquirer.prompt(questions).then((answers: any) => {
    let question: QuestionModel = answers;
    confirmCreation(question);
  });
}

const confirmCreation = (question: QuestionModel) => {
  let questions = [
    {
      type: 'confirm',
      name: 'confirm',
      message: `I Create one workspace call ${question.develop} and ${
        question.quantity
      } workspaces called ${question.qa}, Use this configuration?`,
      default: false
    }
  ];

  inquirer.prompt(questions).then(async answers => {
    let result: any = answers;
    if (result.confirm) {
      let createDevelop: string = `${consts.workspace_create} ${
        question.develop
      } `;
      let createQa: string = '';
      let command: string = '';

      if (question.quantity > 1) {
        for (let index = 1; index <= question.quantity; index++) {
          createQa += `${consts.workspace_create} ${question.qa +
            index} && `;
        }
      } else {
        createQa = `${consts.workspace_create} ${question.qa +
          question.quantity} && `;
      }

      Promise.all(createQa).then(() => {
        command = createQa + createDevelop;
        childProcessRunCommand(command);
      });
    } else {
      return false;
    }
  });
};
