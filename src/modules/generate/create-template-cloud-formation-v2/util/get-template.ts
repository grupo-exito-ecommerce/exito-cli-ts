import { CreateTemplateCloudFormation } from "./../../../../shared/models/global";
let currentOptions: CreateTemplateCloudFormation;

const createCodeCommitConfig = (name: string) => {
  return `{
        "InputArtifacts": [],
        "Name": "${name.replace(".", "-")}-code-commit",
        "ActionTypeId": {
            "Category": "Source",
            "Owner": "AWS",
            "Version": "1",
            "Provider": "CodeCommit"
        },
        "OutputArtifacts": [{
            "Name": "${name.replace(".", "-")}-code-commit"
        }],
        "Configuration": {
            "BranchName": "${currentOptions.nameBranch}",
            "RepositoryName": "${name}"
        },
        "RunOrder": 1
    }`;
};

const getCodeCommitProyects = () => {
  let codeCommit: Array<any> = [];
  currentOptions.codeCommitProyects.map((item: string) =>
    codeCommit.push(createCodeCommitConfig(item))
  );
  return codeCommit;
};

const createCodeBuildConfig = (name: string) => {
  return `{
        "Name": "${name.replace(".", "-")}-code-build",
        "InputArtifacts": [{
            "Name": "${name.replace(".", "-")}-code-commit"
        }],
        "OutputArtifacts": [{
            "Name": "${name.replace(".", "-")}-code-build"
        }],
        "Configuration": {
            "ProjectName": {
                "Ref": "codebuild"
            }
        },
        "ActionTypeId": {
            "Category": "Build",
            "Owner": "AWS",
            "Version": "1",
            "Provider": "CodeBuild"
        },
        "RunOrder": 1
    }`;
};

const getCodeBuildProyects = () => {
  let codeCommit: Array<any> = [];
  currentOptions.codeCommitProyects.map((item: string) =>
    codeCommit.push(createCodeBuildConfig(item))
  );
  return codeCommit;
};

export const getTemplateContent = (options: CreateTemplateCloudFormation) => {
  currentOptions = options;
  return `{
        "AWSTemplateFormatVersion": "2010-09-09",
        "Description": "Cloud Formation Template for build in ${
          options.nameBranch
        } branch",
        "Resources": {
            "pipeline": {
                "Type": "AWS::CodePipeline::Pipeline",
                "DependsOn": ["codebuild"],
                "Properties": {
                    "RoleArn": "arn:aws:iam::402457222534:role/service-role/exito.continuos-integration",
                    "Stages": [{
                            "Name": "Sources",
                            "Actions": [${getCodeCommitProyects()}]
                        },
                        {
                            "Name": "Build",
                            "Actions": [${getCodeBuildProyects()}]
                        }
                    ],
                    "ArtifactStore": {
                        "Type": "S3",
                        "Location": "codepipeline-us-east-1-111801213144"
                    },
                     "Name": "${options.codePipeLineName}"
                }
            },
            "codebuild": {
                "Type": "AWS::CodeBuild::Project",
                "Properties": {
                    "Artifacts": {
                        "Packaging": "NONE",
                        "EncryptionDisabled": false,
                        "Type": "CODEPIPELINE",
                         "Name": "${options.codePipeLineName}"
                    },
                    "ServiceRole": "arn:aws:iam::402457222534:role/service-role/exito.continuos-integration-code-build",
                    "Name": "${options.codeBuildName}",
                    "TimeoutInMinutes": 60,
                    "EncryptionKey": "arn:aws:kms:us-east-1:402457222534:alias/aws/s3",
                    "Description": "Build for components for Vtex",
                    "Cache": {
                        "Type": "NO_CACHE"
                    },
                    "Environment": {
                        "ComputeType": "BUILD_GENERAL1_SMALL",
                        "PrivilegedMode": true,
                        "Image": "aws/codebuild/docker:18.09.0",
                        "Type": "LINUX_CONTAINER",
                        "EnvironmentVariables": []
                    },
                    "Source": {
                        "BuildSpec": "${options.buildSpecDir}",
                        "InsecureSsl": false,
                        "Type": "CODEPIPELINE"
                    },
                    "BadgeEnabled": false
                }
            }
    
        }
    }`;
};
