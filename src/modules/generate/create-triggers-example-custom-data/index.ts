import { writeFileSync } from 'fs';
import { logger } from './../../../shared';
const dirname = process.cwd();

const basicInfo = `
[
  {
    "name": "develop",
    "customData": {
        "codeBuild": "exito-vtex-deploy-develop",
        "vendor": "exito",
        "workspace": "dev",
        "codeCommitBranch": "develop",
        "urlToClone": "https://git-codecommit.us-east-1.amazonaws.com/v1/repos",
        "linkCommand": "vtex link",
        "publishCommand": "vtex workspace use master && vtex publish"
    }
  }
]
`

export default async () => {
  logger.info('Creating aws triggers example custom data');
  await writeFileSync(dirname + "/trigger-config.json", basicInfo);
}