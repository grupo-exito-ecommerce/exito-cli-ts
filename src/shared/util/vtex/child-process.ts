import { configuration, linkErrorLog, linkSuccessLog, LogContent, logger, OptRunCommand, publishErrorLog, publishSuccessLog } from "../../index";
const { spawn } = require("child_process");

export const runCommand = function(options: OptRunCommand) {
  return new Promise(function(fulfill, reject) {
    logger.info(`Using component in the folder: ${options.path}`);

    const task = spawn(`cd ${options.path} && ${options.command}`, [], {
      shell: true
    });

    // Método para imprimir el log normal
    task.stdout.on("data", (data: string) => {
      logger.info(data.toString());

      if (validateLog(options.command, data.toString(), "success")) {
        task.kill("SIGINT");
        fulfill(true);
      }

      if (validateLog(options.command, data.toString(), "error")) {
        task.kill("SIGINT");
        fulfill(false);
        logger.error("Process error");
        process.exit(1);
      }
    });

    // Método para imprimir el log de error
    task.stderr.on("data", function(data: string) {
      logger.info(data.toString());
      // Validación en caso de error
      if (validateLog(options.command, data.toString(), "error")) {
        task.kill("SIGINT");
        reject(false);
        logger.error("Process error");
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
  if (command == configuration.link) {
    if (type == "success") {
      const isFind = !!linkSuccessLog.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!linkErrorLog.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    }
  } else if (command == configuration.publish) {
    if (type == "success") {
      const isFind = !!publishSuccessLog.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    } else if (type == "error") {
      const isFind = !!publishErrorLog.find((element: LogContent) =>
        logMessage.includes(element.log)
      );
      return isFind;
    }
  }
};
