import log from "./../logger";
import { spawn } from "child_process";

export const runMultipleCommand = (command: string): Promise<string> => {
  const task = spawn(`${command}`, [], {
    shell: true
  });
  return new Promise(function(resolve) {
    // Método para imprimir el log normal
    task.stdout!.on("data", (data: string) => {
      log.info(data.toString());
    });

    task.on("exit", () => {
      resolve("exit");
    });

    // Método para imprimir el log de error
    task.stderr!.on("data", function(data: string) {
      log.error(data.toString());
    });
  });
};
