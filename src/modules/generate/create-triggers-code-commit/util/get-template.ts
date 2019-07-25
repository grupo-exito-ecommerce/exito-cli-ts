import {
  CreateTriggerCodeCommit,
  BranchTriggerInformation
} from "./../../../../shared/models/global";
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
    "name": "${currentOptions.codeCommitProyect.replace(".", "-")}-${
    branchInfo.name
  }-${branchInfo.customData.vendor}-deploy",
    "customData": "${escape(branchInfo.customData)}"
}`;
};

const getCodeBuildProyects = () => {
  let codeCommit: Array<any> = [];
  currentOptions.branchs.map((branchInfo: BranchTriggerInformation) =>
    codeCommit.push(createCodeCommitConfig(branchInfo))
  );
  return codeCommit;
};

export const getTemplateContent = (options: CreateTriggerCodeCommit) => {
  currentOptions = options;
  return `{
    "repositoryName": "${options.codeCommitProyect}",
    "triggers": [
    ${getCodeBuildProyects()}
]
}`;
};

const escape = (obj: any) => {
  var escapedValue = JSON.stringify(obj).replace(/"/g, '\\"');
  // var oldValue = escapedValue.replace(/\\\"/g, "\"");
  return escapedValue;
};
