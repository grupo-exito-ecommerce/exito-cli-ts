import { CreateTemplate } from './../../../../shared/models/global';

export const getTemplateContent = (options: CreateTemplate) => {
  return `{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Template for Pipeline Frontend to publish components in Vtex ",
    "Resources": {
        "pipeline": {
            "Type": "AWS::CodePipeline::Pipeline",
            "DependsOn": ["codebuild"],
            "Properties": {
                "RoleArn": "arn:aws:iam::402457222534:role/service-role/exito.continuos-integration",
                "Stages": [{
                        "Name": "Source",
                        "Actions": [{
                            "InputArtifacts": [],
                            "Name": "Source",
                            "ActionTypeId": {
                                "Category": "Source",
                                "Owner": "AWS",
                                "Version": "1",
                                "Provider": "CodeCommit"
                            },
                            "OutputArtifacts": [{
                                "Name": "SourceArtifact"
                            }],
                            "Configuration": {
                                "BranchName": "${options.nameBranch}",
                                "RepositoryName": "${options.nameRepository}"
                            },
                            "RunOrder": 1
                        }]
                    },
                    {
                        "Name": "Build",
                        "Actions": [{
                            "InputArtifacts": [{
                                "Name": "SourceArtifact"
                            }],
                            "Name": "Build",
                            "ActionTypeId": {
                                "Category": "Build",
                                "Owner": "AWS",
                                "Version": "1",
                                "Provider": "CodeBuild"
                            },
                            "OutputArtifacts": [{
                                "Name": "BuildArtifact"
                            }],
                            "Configuration": {
                                "ProjectName": {
                                    "Ref": "codebuild"
                                }
                            },
                            "RunOrder": 1
                        }]
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
