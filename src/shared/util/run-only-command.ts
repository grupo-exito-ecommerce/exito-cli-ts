import log from './../logger';
import { spawn } from 'child_process';

export const runOnlyCommand = (command: string): Promise<string> => {
  const task = spawn(`${command}`, [], {
    shell: true
  });
  return new Promise(function (resolve, reject) {

    // Método para imprimir el log normal
    task.stdout!.on('data', (data: string) => {
      resolve(data.toString())
    });

    // Método para imprimir el log de error
    task.stderr!.on('data', function (data: string) {
      log.error(data.toString());
      reject(false)
      if (!data.toString().includes('fatal: A branch named')) {
        process.exit(1)
      }
    });
  })
};
