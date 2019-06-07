import log from '../../../../../shared/logger';
import { spawn } from 'child_process';

export const childProcessRunCommandPublish = function(command: string) {
  const task = spawn(`${command}`, [], {
    shell: true
  });

  // Método para imprimir el log normal
  task.stdout!.on('data', (data: string) => {
    log.info(data.toString());
    validateBuild(data);
  });

  // Método para imprimir el log de error
  task.stderr!.on('data', function(data: string) {
    log.info(data.toString());
    validateBuild(data);
  });
};

const validateBuild = (data: string) => {
  if (data.toString().includes('Failed to publish')) {
    log.error('exito cli error on publish component');
    process.exit(1);
  } else if (data.toString().includes('504 Gateway Time-out')) {
    log.error('exito cli error on publish component');
    process.exit(1);
  } else if (data.toString().includes('Request failed with status code 404')) {
    log.error('exito cli error on publish component');
    process.exit(1);
  }else if (data.toString().includes('An error happened while building')) {
    log.error('exito cli error on publish component');
    process.exit(1);
  }
};
