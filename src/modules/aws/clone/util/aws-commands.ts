import { exec, spawn } from "child_process";
import {
  RepositoryOptions,
  ProjectList,
  RepositoryMetadataResponse
} from "../../../../shared/models/global";
import log from "../../../../shared/logger";

/**
 *  Método para obtener la lista de repositorios disponibles en aws
 */
export const getProjectDirectory = (): Promise<ProjectList> => {
  return new Promise(function(fulfill, reject) {
    try {
      let result = null;
      exec(`aws codecommit list-repositories`, (error, stdout, _stderr) => {
        if (error) {
          reject(error);
        }
        result = JSON.parse(stdout.toString());
        fulfill(result);
      });
    } catch (error) {
      log.debug(error);
      reject(error);
    }
  });
};

export const getProjectInformation = (
  projectName: string
): Promise<RepositoryMetadataResponse> => {
  return new Promise(function(fulfill, reject) {
    try {
      let result: RepositoryMetadataResponse;
      exec(
        `aws codecommit get-repository --repository-name ${projectName}`,
        (error, stdout, _stderr) => {
          if (error) {
            reject(error);
          }
          result = JSON.parse(stdout.toString());
          fulfill(result);
        }
      );
    } catch (error) {
      log.debug(error);
      reject(error);
    }
  });
};

export const cloneProject = (options: RepositoryOptions) => {
  return new Promise(function(fulfill, reject) {
    try {
      log.info(`Cloning ${options.project.repositoryMetadata.cloneUrlHttp}`);
      const repositorie = options.project.repositoryMetadata.cloneUrlHttp.replace(
        "https://",
        ""
      );

      const task = spawn(
        `cd ${options.path} && git clone https://${
          options.credentials.username
        }:${options.credentials.pwd}@${repositorie} -b master `,
        [],
        { shell: true }
      );

      task.on("close", () => {
        fulfill(true);
      });

      // Método para imprimir el log normal
      task.stdout.on("data", data => {
        log.info(data.toString());
      });

      // Método para imprimir el log de error
      task.stderr.on("data", data => {
        log.info(data.toString());
      });
    } catch (error) {
      log.debug(error);
      reject(error);
    }
  });
};
