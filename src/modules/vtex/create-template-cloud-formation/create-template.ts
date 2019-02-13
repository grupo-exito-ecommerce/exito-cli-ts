import { consts } from './../../../shared/constants';
import log from '../../../shared/logger';
import { getTemplateContent } from './get-template';
let fs = require('fs');
const {
  configDir,
  cloudFormationDir,
  themeDevelop,
  themeMaster,
  buildSpecDevelopDir,
  buildSpecMasterpDir,
  codeBuild,
  codePipeline,
  branchDevelop,
  branchMaster
} = consts.aws_template;
const dirname = process.cwd() + `/${configDir}`;

import { CreateTemplate } from './../../../shared/models/global';

/**
 * Este archivo realiza la creación de la estructura base para el tema de la aplicación.
 * recibe como parametro el nombre del tema que se va a emplear
 *
 */
export default async (repository: string) => {
  log.info('Creating aws cloud-formation template');
  const nameRepositoryFormat = repository.replace('.', '-');

  let config: CreateTemplate = {
    nameRepository: repository,
    nameBranch: branchDevelop,
    namefile: themeDevelop,
    buildSpecDir: buildSpecDevelopDir,
    codeBuildName: `${nameRepositoryFormat}-${codeBuild}`,
    codePipeLineName: `${nameRepositoryFormat}-${codePipeline}`
  };

  await ensureDirectoryExistence(dirname);
  await ensureDirectoryExistence(dirname + `/${cloudFormationDir}`);

  log.info('Creating develop template');
  await createTemplate(config);

  log.info('Creating master template');
  config.namefile = themeMaster;
  config.buildSpecDir = buildSpecMasterpDir;
  config.nameBranch = branchMaster;

  await createTemplate(config);
  log.info('Templates generate succesfully!!');
};

const ensureDirectoryExistence = async (filePath: string): Promise<Boolean> => {
  if (fs.existsSync(filePath)) {
    return true;
  }
  await fs.mkdirSync(filePath);
  return true;
};

/**
 * Método que sobreescribe el archivo de tema base para la aplicación.
 */
const createTemplate = async (options: CreateTemplate) => {
  return fs.writeFile(
    `${dirname}/${cloudFormationDir}/${options.namefile}.json`,
    await getTemplateContent(options),
    function(err: string) {
      if (err) {
        throw err;
      }
    }
  );
};
