import { ContentManifest } from './../../../shared/models/global';
import log from "./../../../shared/logger";
import { getManifestContent } from "../../../shared/util/get-content-files";
import { writeFileSync } from 'fs';

export default async function(vendor: string) {
  log.info("Update manifest information");
  const directory = process.cwd();
  const content:ContentManifest = await getManifestContent(directory);
  updateManifestInfo(content,vendor)
}

const updateManifestInfo = async(manifest:ContentManifest, vendor:string) =>{
    manifest.vendor = vendor;
    let manifestCopy = Object.assign({}, manifest);
    delete manifestCopy.path
    await writeFile(manifest.path, JSON.stringify(manifestCopy,null,4))
}

const writeFile = async (path: string, string: string) => {
   try {
    await writeFileSync(path + '/manifest.json', string)
    log.info("manifest file update.")
   } catch (error) {
       log.error(error)
   }
}