import {
  getProjectDirectory,
  getProjectInformation
} from "./util/aws-commands";
import {
  OptCommand,
  RepositoryList,
  AwsState
} from "../../../shared/interface";
import _ from "lodash";
import { setCredentials } from "./util/credentials";
import { getCriteriaOfSearch } from "./util/params";
import { filterProjects } from "./util/filterProjects";
import { findDependency } from "./util/selectProject";
import { executeCommands } from "./util/executeCommands";
import log from "../../../shared/logger";

let state: AwsState = {
  path: "",
  criteria: "",
  credentials: {
    username: "",
    pwd: ""
  },
  projectList: {
    repositories: []
  }
};

export const clone = async (options: OptCommand) => {
  // 0. Set path
  state.path = options.directory;

  // 1. Obtengo las credenciales del usuario
  let credentials = await setCredentials();

  if (!_.isEmpty(credentials)) {
    // Set the credentials
    state.credentials = credentials.user;
    // 2. Obtengo el criterio de busqueda para los projectos
    let criteria = await getCriteriaOfSearch();

    if (criteria) {
      // set the current criteria for search
      state.criteria = criteria;

      // 3. Obtengo la lista de projectos de aws
      state.projectList = await getProjectDirectory();

      if (state.projectList.repositories.length > 0) {
        let filterProject: Array<RepositoryList> = [];
        filterProject = state.projectList.repositories;

        // 3.1 Filtro el array de acuerdo al criterio de busqueda
        if (criteria != "all") {
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

        // 3.3 Seleciono los projecto a clonar
        let selectProject = await findDependency(filterProject);

        if (selectProject) {
          // 4. Obtengo la información de los repositorios de aws. para poder realizar la clonación
          let results = selectProject.map(async (element: any) => {
            let metadata = await getProjectInformation(element.repositoryName);
            element.repositoryMetadata = metadata.repositoryMetadata;
          });

          // 4.1 Espero a que finalicen todas los await definidos en el map
          Promise.all(results).then(() => {
            // 5 Realizo el proceso de clonación
            let options = {
              path: state.path,
              credentials: state.credentials,
              projectList: selectProject,
              position: 0
            };
            executeCommands(options);
          });
        } else {
          log.error("No projects found");
        }
      } else {
        log.info("No project select to clone");
      }
    } else {
      log.info("No have criteria for search projects");
    }
  }
};
