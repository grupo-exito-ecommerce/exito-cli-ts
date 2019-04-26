import { CreateTemplate } from "./../../../../shared/models/global";

export const getTemplateContent = (options: CreateTemplate) => {
  return `{
    "AWSTemplateFormatVersion": "2010-09-09",
    "Description": "Cloud Formation Template for ${options.nameRepository}",
    "Resources": {
        "AmazonCloudWatchEventRule": {
            "Type": "AWS::Events::Rule",
            "DependsOn": ["pipeline"],
            "Properties": {
                "EventPattern": {
                    "source": [
                        "aws.codecommit"
                    ],
                    "detail-type": [
                        "CodeCommit Repository State Change"
                    ],
                    "resources": [{
                        "Fn::Join": [
                            "",
                            [
                                "arn:aws:codecommit:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                "${options.nameRepository}"
                            ]
                        ]
                    }],
                    "detail": {
                        "event": [
                            "referenceCreated",
                            "referenceUpdated"
                        ],
                        "referenceType": [
                            "branch"
                        ],
                        "referenceName": ["${options.nameBranch}"]
                    }
                },
                "Targets": [{
                    "Arn": {
                        "Fn::Join": [
                            "",
                            [
                                "arn:aws:codepipeline:",
                                {
                                    "Ref": "AWS::Region"
                                },
                                ":",
                                {
                                    "Ref": "AWS::AccountId"
                                },
                                ":",
                                "${options.codePipeLineName}"
                            ]
                        ]
                    },
                    "RoleArn": {
                        "Fn::GetAtt": [
                            "AmazonCloudWatchEventRole",
                            "Arn"
                        ]
                    },
                    "Id": "codepipeline-AppPipeline"
                }]
            }
        },
        "AmazonCloudWatchEventRole": {
            "Type": "AWS::IAM::Role",
            "DependsOn": ["pipeline"],
            "Properties": {
                "AssumeRolePolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [{
                        "Effect": "Allow",
                        "Principal": {
                            "Service": [
                                "events.amazonaws.com"
                            ]
                        },
                        "Action": "sts:AssumeRole"
                    }]
                },
                "Path": "/",
                "Policies": [{
                    "PolicyName": "cwe-pipeline-execution",
                    "PolicyDocument": {
                        "Version": "2012-10-17",
                        "Statement": [{
                            "Effect": "Allow",
                            "Action": "codepipeline:StartPipelineExecution",
                            "Resource": {
                                "Fn::Join": [
                                    "",
                                    [
                                        "arn:aws:codepipeline:",
                                        {
                                            "Ref": "AWS::Region"
                                        },
                                        ":",
                                        {
                                            "Ref": "AWS::AccountId"
                                        },
                                        ":",
                                        "${options.codePipeLineName}"
                                    ]
                                ]
                            }
                        }]
                    }
                }]
            }
        },
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
                                "PollForSourceChanges": "false",
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
