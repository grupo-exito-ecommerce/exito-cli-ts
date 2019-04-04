import { consts } from './../../../../../shared/constants';
import log from "../../../../../shared/logger";
import { runOnlyCommand } from "../../../../../shared/util/run-only-command";

export const createGitFeature = async (directory: Array<string>) => {
    log.info('Creating feature git')
    console.log(directory.length)
    directory.map(item => {
        createFeatureBranch(item);
    })
}


const createFeatureBranch = (directory: string) => {
    const command = `cd ${directory} &&  ${consts.git.command_create_feature} ${consts.git.namefeature}`
    runOnlyCommand(command)
}