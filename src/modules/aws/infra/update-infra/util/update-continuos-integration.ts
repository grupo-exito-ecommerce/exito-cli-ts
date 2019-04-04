import { consts } from './../../../../../shared/constants';
import log from "../../../../../shared/logger";
import { runOnlyCommand } from "../../../../../shared/util/run-only-command";
const fs = require('fs');

export const updateConfigContinuosIntegration = (directory: Array<string>) => {
    log.info("Update continuos integration config")

    return Promise.all(directory.map(async (item) => {
        // 1. Elimino la carpeta config
        await deletConfigFolder(item)

        // 2. Creo la carpeta config
        await createConfigFolder(item)

        // 3. Creo el template de aws.
        await createTemplateFiles(item)
    }))
}

const createConfigFolder = async (directory: string) => {
    return await runOnlyCommand(`cd ${directory} && ${consts.exito.command_generate_config}`)
}

const deletConfigFolder = async (directory: string) => {
    return await deleteFolderRecursive(directory + '/config')
}

const createTemplateFiles = async (directory: string) => {
    const repositoryName = await getRepositoryName(directory)
    return await runOnlyCommand(`cd ${directory} && ${consts.exito.command_generate_tempalte} ${repositoryName}`)
}


// Método que retorna el nombre del repositorios, se realiza obteniendo el nombre de la carpeta donde se enuentra el proyecto. por estandar lo manejamos de acuerdo al nombre del repositorio.
const getRepositoryName = (directory: string) => {
    const dir = directory.split('/');
    return dir[dir.length - 1]
}

// Método para eliminar la carpeta config
const deleteFolderRecursive = function (path: string) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file: string) {
            const curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};