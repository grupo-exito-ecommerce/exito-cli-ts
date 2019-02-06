const { spawn } = require('child_process');
import log from '../../../shared/logger';

export const childProcessRunCommand = function(command: string) {
  const task = spawn(`${command}`, [], {
    shell: true
  });

  // Método para imprimir el log normal
  task.stdout.on('data', (data: string) => {
    log.info(data.toString());
  });

  // Método para imprimir el log de error
  task.stderr.on('data', function(data: string) {
    log.info(data.toString());
  });
};
