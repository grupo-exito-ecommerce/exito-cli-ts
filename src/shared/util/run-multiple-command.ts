import log from "./../logger";
import { spawn } from "child_process";

export const runMultipleCommand = (
  command: string,
  errors?: Array<string>
): Promise<string> => {
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
    task.stderr!.on("data", (data: string) => {
      log.warn(data.toString());

      if (errors) {
        errors.map((item: string) => {
          if (data.toString().includes(item)) {
            process.exit(1);
          }
        });
      }
    });
  });
};
