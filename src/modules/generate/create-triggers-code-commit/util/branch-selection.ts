import { BranchTriggerInformation } from './../../../../shared/models/global';
import log from './../../../../shared/logger';
const fs = require('fs');

const readConfigFile = async (dir: string): Promise<BranchTriggerInformation[]> => {
    // Metodo que trae el contenido de un directorio indicado
    try {
        if (fs.existsSync(`${dir}/trigger-config.json`)) {
            // Do something
            let branch: BranchTriggerInformation[] = await JSON.parse(
                fs.readFileSync(`${dir}/trigger-config.json`, 'utf8')
            );
            if (branch) {
                log.info(`trigger-config.json found in ${dir}`);
                return branch
            } else {
                return []
            }
        } else {
            log.info(`trigger-config.json not found in ${dir}`);
            return []
        }
    } catch (error) {
        log.info(`error on read the trigger-config file in ${dir} check the content`);
        return []
    }
};

export const promtsBranchsConfiguration = async (dir: string): Promise<BranchTriggerInformation[]> => {
    let branch: BranchTriggerInformation[] = await readConfigFile(dir);
    if (branch.length) {
        return branch
    } else {
        return []
    }
}