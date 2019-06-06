import log from './../../../shared/logger';
import { writeFileSync } from 'fs';
const dirname = process.cwd();

const basicInfo = `
[
  {
    "name": "develop",
    "customData": {
        "code_build": "exito-vtex-deploy-develop",
        "vendor": "exito",
        "workspace": "dev",
        "code_commit_branch": "develop",
        "url_to_clone": "https://git-codecommit.us-east-1.amazonaws.com/v1/repos"
    }
  }
]
`

export default async () => {
  log.info('Creating aws triggers example custom data');
  await writeFileSync(dirname + "/trigger-config.json", basicInfo);
}