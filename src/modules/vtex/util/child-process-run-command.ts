import log from '../../../shared/logger';
import { spawn } from 'child_process';

export const childProcessRunCommand = function(command: string) {
  const task = spawn(`${command}`, [], {
    shell: true
  });

  // Método para imprimir el log normal
  task.stdout!.on('data', (data: string) => {
    log.info(data.toString());
  });

  // Método para imprimir el log de error
  task.stderr!.on('data', function(data: string) {
    log.info(data.toString());
    if(data.toString().includes('Publishing failed')){
      process.exit(1)
    }
  });
};
