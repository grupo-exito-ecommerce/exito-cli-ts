import { consts } from './../../../../shared/constants';
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
  return new Promise(function (fulfill, reject) {
    try {
      let result: ProjectList;
      exec(consts.aws.command_list_repositories, (error, stdout, _stderr) => {
        if (error) {
          log.error("AWS Error:" + error)
          log.info(consts.messages.awsAccesKey)
          reject(error);
          process.exit(1)
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
  return new Promise(function (fulfill, reject) {
    try {
      let result: RepositoryMetadataResponse;
      exec(
        `${consts.aws.command_get_repositories} ${projectName}`,
        (error, stdout, _stderr) => {
          if (error) {
            log.info(consts.messages.awsAccesKey)
            reject(error);
            process.exit(1)
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
  return new Promise(function (fulfill, reject) {
    try {
      log.info(`Cloning ${options.project.repositoryMetadata.cloneUrlHttp}`);
      const repositorie = options.project.repositoryMetadata.cloneUrlHttp.replace(
        "https://",
        ""
      );

      const task = spawn(
        `cd ${options.path} && ${consts.git.command_clone} https://${
        options.credentials.username
        }:${options.credentials.pwd}@${repositorie} ${options.branch} `,
        [],
        { shell: true }
      );

      task.on("close", () => {
        fulfill(true);
      });

      // Método para imprimir el log normal
      task.stdout!.on("data", data => {
        log.info(data.toString());
      });

      // Método para imprimir el log de error
      task.stderr!.on("data", (data: string) => {
        log.info(data.toString());

        if (data.toString().includes("already exists and is not an empty directory")) {
          fulfill(false)
        }
      });
    } catch (error) {
      log.debug(error);
      reject(error);
      process.exit(1)
    }
  });
};
