import { writeFileSync } from 'fs';
import { ContentManifest } from './../../../../../shared/models/global';
import log from "../../../../../shared/logger";
import { getContentFiles } from "../../../../../shared/util/get-content-files";
import { toString } from 'ramda';

export const incrementVersion = async (directory: Array<string>) => {
    log.info("Increment versión")

    const content: Array<ContentManifest> = await getContentFiles(directory)

    await Promise.all(content.map(async (item) => {
        item.version = incrementNumber(item.version)
        let manifest = Object.assign({}, item);
        delete manifest.path
        await writeFile(item.path, JSON.stringify(manifest,null,4))
    }))

    return true
}


// Método que se encarga de incrementar la ultima versión de la aplicación
const incrementNumber = (version: string) => {
    const split = version.split('.')
    split[2] = toString(parseInt(split[2]) + 1)
    const newVersion = `${split[0]}.${split[1]}.${split[2]}`;
    return newVersion
}


const writeFile = async (path: string, string: string) => {
    await writeFileSync(path + '/manifest.json', string)
}