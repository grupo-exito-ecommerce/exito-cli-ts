const fs = require('fs');
import log from '../../../../shared/logger';

// Metodo que trae el contenido de un directorio indicado
export const getJestConfigContent = async (dir: string): Promise<any> => {
  let jest: any = null;
  try {
    if (fs.existsSync(dir)) {
      console.log(dir);
      // Do something
      let result: string = await fs.readFileSync(dir, 'utf8');
      if (result) {
        let newResult = result.replace(
          '= {',
          `= {
            coverageThreshold: {
            "global": {
              "branches": 50,
              "functions": 50,
              "lines": 50
            }
        },`
        );
        jest = newResult;
        return jest;
      }
    } else {
      log.debug(`jest.config.js not found in ${dir}`);
      process.exit(1);
    }
  } catch (error) {
    log.debug(
      `error on read the jest.config.js file in ${dir} check the content`
    );
    process.exit(1);
  }
};

// Metodo que trae el contenido de un directorio indicado
export const getSonarQubeContent = async (dir: string): Promise<any> => {
  let jest: any = null;
  try {
    if (fs.existsSync(dir)) {
      // Do something
      let result: string = await fs.readFileSync(dir, 'utf8');
      if (result) {
        jest = result += `sonar.host.url=http://18.213.20.207/
sonar.login=c234975f7deabc7e40e6dcc4af2e3cfd9168a96e`;
        return jest;
      }
    } else {
      log.debug(`sonar-project.properties not found in ${dir}`);
      process.exit(1);
    }
  } catch (error) {
    log.debug(
      `error on read the sonar-project.properties file in ${dir} check the content`
    );
    process.exit(1);
  }
};
