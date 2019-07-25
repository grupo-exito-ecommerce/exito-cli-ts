import { consts } from "./../../../shared/constants";
import {
  link_success_log,
  link_error_log,
  publish_success_log,
  publish_error_log
} from "../../../shared/log-vtex";
import { OptRunCommand, LogContent } from "../../../shared/models/global";
const { spawn } = require("child_process");
import log from "../../../shared/logger";

export const runCommand = function (options: OptRunCommand) {
  return new Promise(function (fulfill, reject) {
    log.info(`Using component in the folder: ${options.path}`);

    const task = spawn(`cd ${options.path} && ${options.command}`, [], {
      shell: true
    });

    // Método para imprimir el log normal
    task.stdout.on("data", (data: string) => {
      log.info(data.toString());

      if (validateLog(options.command, data.toString(), "success")) {
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
    task.stderr.on("data", function (data: string) {
      log.info(data.toString());
      // Validación en caso de error
      if (validateLog(options.command, data.toString(), "error")) {
        task.kill("SIGINT");
        reject(false);
        log.error("Process error")
        process.exit(1);
      }

      if (validateLog(options.command, data.toString(), "success")) {
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
  logMessage: string,
  type: string
) => {
  if (command == consts.link) {
    if (type == "success") {
      const isFind = !!link_success_log.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!link_error_log.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    }
  } else if (command == consts.publish) {
    if (type == "success") {
      const isFind = !!publish_success_log.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!publish_error_log.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    }
  }
};
