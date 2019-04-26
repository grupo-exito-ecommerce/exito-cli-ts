import { consts } from "./../../../shared/constants";
import {
  link_succes_log,
  link_error_log,
  publish_succes_log,
  publish_error_log
} from "../../../shared/log-vtex";
import { OptRunCommand, LogContent } from "../../../shared/models/global";
const { spawn } = require("child_process");
import log from "../../../shared/logger";

export const runCommand = function(options: OptRunCommand) {
  return new Promise(function(fulfill, reject) {
    log.info(`Using component in the folder: ${options.path}`);

    const task = spawn(`cd ${options.path} && ${options.command}`, [], {
      shell: true
    });

    // Método para imprimir el log normal
    task.stdout.on("data", (data: string) => {
      log.info(data.toString());

      if (validateLog(options.command, data.toString(), "succes")) {
        task.kill("SIGINT");
        fulfill(true);
      }

      if (validateLog(options.command, data.toString(), "error")) {
        task.kill("SIGINT");
        fulfill(false);
        log.error("Process error")
        process.exit(1);
      }
    });

    // Método para imprimir el log de error
    task.stderr.on("data", function(data: string) {
      log.info(data.toString());
      // Validación en caso de error
      if (validateLog(options.command, data.toString(), "error")) {
        task.kill("SIGINT");
        reject(false);
        log.error("Process error")
        process.exit(1);
      }

      if (validateLog(options.command, data.toString(), "succes")) {
        task.kill("SIGINT");
        fulfill(true);
      }
    });
  });
};

/**
 * Método para validar que tipo de mensaje se esta retornando
 * command: string
 * type: string
 */
export const validateLog = (
  command: string,
  logMesage: string,
  type: string
) => {
  if (command == consts.link) {
    if (type == "succes") {
      const isFind = !!link_succes_log.find((element: LogContent) =>
        logMesage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!link_error_log.find((element: LogContent) =>
        logMesage.includes(element.log)
      );
      return isFind;
    }
  } else if (command == consts.publish) {
    if (type == "succes") {
      const isFind = !!publish_succes_log.find((element: LogContent) =>
        logMesage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!publish_error_log.find((element: LogContent) =>
        logMesage.includes(element.log)
      );
      return isFind;
    }
  }
};
