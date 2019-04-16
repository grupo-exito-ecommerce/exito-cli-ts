import log from "./../logger";
import { spawn } from "child_process";

export const runOnlyCommand = (command: string): Promise<string> => {
  const task = spawn(`${command}`, [], {
    shell: true
  });
  return new Promise(function(resolve) {
    // Método para imprimir el log normal
    task.stdout!.on("data", (data: string) => {
      log.info(data.toString());
      resolve(data.toString());
    });

    // Método para imprimir el log de error
    task.stderr!.on("data", function(data: string) {
      log.debug("Error running the command: " + command);
      log.error(data.toString());
    });
  });
};
