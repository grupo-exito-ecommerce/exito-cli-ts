import { consts } from './../../../shared/constants';
import * as inquirer from 'inquirer';
import { keys, prop } from 'ramda';
import log from '../../../shared/logger';
import * as git from './git';
import * as _ from 'lodash';

const templates: any = {
  'hello react typescript': 'hello-react-ts'
};

const promptTemplates = async (): Promise<string> => {
  const cancel = 'Cancel';
  const chosen: any = prop<string>(
    'service',
    await inquirer.prompt({
      name: 'service',
      message: 'Choose where do you want to start from',
      type: 'list',
      choices: [...keys(templates), cancel]
    })
  );
  if (chosen === cancel) {
    log.info('Bye o/');
    return process.exit();
  }
  return chosen;
};

const promptContinue = async () => {
  const proceed = prop(
    'proceed',
    await inquirer.prompt({
      name: 'proceed',
      message: `You are about to remove all files in ${process.cwd()}. Do you want to continue?`,
      type: 'confirm'
    })
  );
  if (!proceed) {
    log.info('Bye o/');
    process.exit();
  }
};

export default async () => {
  log.debug('Prompting for app info');
  log.info(
    'Hello! I will help you generate basic files and folders for your app.'
  );
  try {
    const repo = templates[await promptTemplates()];

    console.log(repo);
    await promptContinue();
    log.info(`Cloning https://${consts.github_account}s/${repo}.git`);
    git.clone(repo);
  } catch (err) {
    log.error(err.message);
    err.printStackTrace();
  }
};
