let fs = require('fs');
import log from './../../../shared/logger';
import { consts } from '../../../shared/constants';
import { developDocker } from './util/docker-develop-template';
import { productionDocker } from './util/docker-production-template';
const dirname = process.cwd();

export default async (environemnt: string) => {

    // 1. Create the file in base to the selection 'dev' or 'production
    if (environemnt == consts.environment.develop) {
        log.info(`Create the docker ${environemnt}`)
        createDevelopDockerFile();
    } else if (environemnt == consts.environment.production) {
        log.info(`Create the docker ${environemnt}`)
        createProductionDockerFile();
    } else {
        log.error("No environment indicate to create the file")
    }
}

const createDevelopDockerFile = async () => {
    try {
        return fs.writeFile(`${dirname}/develop-cli.dockerfile`,
            await developDocker(),
            function (err: string) {
                if (err) {
                    throw err;
                }
            }
        );
    } catch (error) {
        log.debug("error" + error)
    }
}

const createProductionDockerFile = async () => {
    try {
        return fs.writeFile(`${dirname}/production-cli.dockerfile`,
            await productionDocker(),
            function (err: string) {
                if (err) {
                    throw err;
                }
            }
        );
    } catch (error) {
        log.debug("error" + error)
    }
}