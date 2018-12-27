import log from "../../../../shared/logger";
import { spawn } from "child_process";
import { OptRunCommand } from "../../../../shared/interface";

exports.runCommand = (options: OptRunCommand) => {
  return new Promise(function(fulfill, reject) {
    try {
      log.info(`Clone project in directory: ${options.path}`);
      log.debug(`Running ${options.command}...`);

      const task = spawn(`cd ${options.path} && ${options.command}`, [], {
        shell: true
      });

      // Método para imprimir el log normal
      task.stdout.on("data", data => {
        log.info(data.toString());
        if (data.includes("Step success finished")) {
          task.kill("SIGINT");
          fulfill(true);
        }

        if (data.includes("Successfully unlinked")) {
          task.kill("SIGINT");
          fulfill(true);
        }
      });

      // Método para imprimir el log de error
      task.stderr.on("data", function(data) {
        log.info("Error: " + data);

        // Validación en caso de error
        if (data.includes("App build failed with message")) {
          reject(false);
          process.exit();
        }

        if (data.includes("Error unlinking")) {
          task.kill("SIGINT");
          fulfill(true);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
