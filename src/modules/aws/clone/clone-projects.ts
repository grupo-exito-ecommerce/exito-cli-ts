import { AwsCredentials } from './../../../shared/models/global';
import {
  getProjectDirectory,
  getProjectInformation
} from './util/aws-commands';
import { RepositoryList, AwsState } from '../../../shared/models/global';
import _ from 'lodash';
import { filterProjects } from './util/filterProjects';
import { findDependency } from './util/selectProject';
import { executeCommands } from './util/executeCommands';
import log from '../../../shared/logger';
import chalk from 'chalk';
import ora from 'ora';
import { PrompCredentials } from '../../credentials/required-credentials';

let state: AwsState = {
  path: '',
  criteria: '',
  credentials: {
    username: '',
    pwd: ''
  },
  projectList: {
    repositories: []
  }
};

export default async (crit: string, all: string) => {
  try {
    const spinner = ora('Start cloning process').start();
    // 0. Set path
    state.path = process.cwd() + '/';

    // 1. Obtengo las credenciales del usuario
    let credentials: AwsCredentials;

    credentials = await PrompCredentials();

    if (!_.isEmpty(credentials)) {
      // Set the credentials
      state.credentials = credentials;

      // 2. Obtengo el criterio de busqueda para los projectos
      let criteria: string = '';
      if (crit) {
        spinner.text = `Search proyects with ${chalk.redBright(crit)} \n`;
        criteria = crit;
        log.debug(
          `Use the indicate criteria for clone filter the projects list  ${chalk.whiteBright(
            'criteria'
          )}: ${chalk.redBright(crit)}`
        );
      } else {
        spinner.fail('Error on clone \n');
        // criteria = await getCriteriaOfSearch();
        log.error('Your no indicate the criteria for search the project list.');
        process.exit();
      }

      if (criteria) {
        // set the current criteria for search
        state.criteria = criteria;

        // 3. Obtengo la lista de projectos de aws
        state.projectList = await getProjectDirectory();

        if (state.projectList.repositories.length > 0) {
          let filterProject: Array<RepositoryList> = [];
          filterProject = state.projectList.repositories;

          // 3.1 Filtro el array de acuerdo al criterio de busqueda, si se indica all como criterio paso a obtener todos los projectos
          if (criteria != 'all') {
            filterProject = await filterProjects(
              state.projectList,
              state.criteria
            );
          }

          // 3.2 Agrego la opción para realizar el filtro de dependencias por parte del usuario
          filterProject.map((item: RepositoryList) => {
            item.title = `${item.repositoryName}`;
            item.value = `${item.repositoryName}`;
            item.repositoryId = `${item.repositoryId}`;
            item.selected = true;
          });

          let selectProject: Array<RepositoryList> = filterProject;

          // 3.3 Valido si el usuario indico el clonar todos los projectos automaticamente, si no se ha indicado esto. paso a mostrar el seleccionable del prompt
          if (!all) {
            spinner.stop();
            // 3.3.1 Seleciono los projecto a clonar
            selectProject = await findDependency(filterProject);
          }

          if (selectProject) {
            spinner.text = '';
            spinner.start();
            // 4. Obtengo la información de los repositorios de aws. para poder realizar la clonación
            let results = selectProject.map(async (element: any) => {
              let metadata = await getProjectInformation(
                element.repositoryName
              );
              element.repositoryMetadata = metadata.repositoryMetadata;
            });

            // 4.1 Espero a que finalicen todas los await definidos en el map
            Promise.all(results).then(async () => {
              // 5 Realizo el proceso de clonación
              let options = {
                path: state.path,
                credentials: state.credentials,
                projectList: selectProject,
                position: 0
              };
              let cloned = await executeCommands(options);
              cloned == true
                ? spinner.succeed('Proyect clone succes')
                : spinner.fail('Process clone succes with errors');
            });
          } else {
            log.warn('No projects found');
          }
        } else {
          log.warn('No project select to clone');
        }
      } else {
        log.warn('No have criteria for search projects');
      }
    }
  } catch (e) {
    log.debug(e);
  }
};
