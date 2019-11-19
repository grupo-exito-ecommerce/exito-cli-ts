import { BranchTriggerInformation, CreateTriggerCodeCommit } from "./../../../../shared";
let currentOptions: CreateTriggerCodeCommit;

// Retorno la cadena de string con los diferentes metodos que se quieren escuchar del trigger
const getUpdateReference = (): string => {
  let updateReference = "";
  currentOptions.updateReference.map(
    (item: string) =>
      (updateReference += `"${item}"${
        currentOptions.updateReference.length > 1 ? "," : ""
      }`)
  );
  return updateReference;
};

const createCodeCommitConfig = (branchInfo: BranchTriggerInformation) => {
  return `{
    "destinationArn": "${currentOptions.destinationArn}",
    "events": [
        ${getUpdateReference()}
    ],
    "branches": [
        "${branchInfo.name}"
    ],
    "name": "${currentOptions.codeCommitProject.replace(".", "-")}-${
    branchInfo.name
  }-${branchInfo.customData.vendor}-deploy",
    "customData": "${escape(branchInfo.customData)}"
}`;
};

const getCodeBuildProjects = () => {
  let codeCommit: Array<any> = [];
  currentOptions.branches.map((branchInfo: BranchTriggerInformation) =>
    codeCommit.push(createCodeCommitConfig(branchInfo))
  );
  return codeCommit;
};

export const getTemplateContent = (options: CreateTriggerCodeCommit) => {
  currentOptions = options;
  return `{
    "repositoryName": "${options.codeCommitProject}",
    "triggers": [
    ${getCodeBuildProjects()}
]
}`;
};

const escape = (obj: any) => {
  var escapedValue = JSON.stringify(obj).replace(/"/g, '\\"');
  return escapedValue;
};
