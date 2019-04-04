import { consts } from './../../../../../shared/constants';
import log from "../../../../../shared/logger";
import { runOnlyCommand } from "../../../../../shared/util/run-only-command";

export const createGitFeature = async (directory: Array<string>) => {
    log.info('Creating feature git')
    return Promise.all(directory.map(async (item) => {
        await createFeatureBranch(item);
    }))
}

// Método que permite crear el feature en el proyecto indicado.
const createFeatureBranch = async (directory: string) => {
    try {
        const command = `cd ${directory} &&  ${consts.git.command_create_feature} ${consts.git.namefeature}`
        const response = await runOnlyCommand(command)
        return response
    } catch (error) {
        return false
    }
}