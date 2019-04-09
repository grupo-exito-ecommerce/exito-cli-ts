import { getCurrenVersion } from "../conf";

// Lista de comandos empleados para vtex
export const consts = {
  link: "vtex link",
  publish: "vtex publish",
  workspace_create: "vtex workspace create",
  github_account: "grupo-exito-ecommerce",
  config_repository: "exito-vtex-config",
  authtoken: "--exito.myvtex.com/exito/token",
  generate: {
    master_dockerfile_name: "master-cli.dockerfile",
    develop_dockerfile_name: "develop-cli.dockerfile"
  },
  exito: {
    default_src: "src",
    command_generate_config: "exito generate config",
    command_generate_sonar: "exito generate sonar",
    command_generate_tempalte: "exito generate template"
  },
  git: {
    namefeature: "feature/aws-infra-update-exito-cli",
    command_create_feature: "git checkout -b",
    command_push_changes: `git add . && git commit -m "exito cli update infra, version ${getCurrenVersion()}" && git push --set-upstream origin feature/aws-infra-update-exito-cli`,
    command_clone: "git clone",
    command_default_branch_clone: "-b master"
  },
  aws: {
    command_list_repositories: "aws codecommit list-repositories",
    command_get_repositories: "aws codecommit get-repository --repository-name"
  },
  environment: {
    develop: "dev",
    production: "prod"
  },
  // configuration aws cloud-formation for vtex
  aws_template: {
    configDir: "config",
    sonarDir: "sonar",
    cloudFormationDir: "cloud-formation",
    themeDevelop: "develop-template",
    themeMaster: "master-template",
    buildSpecDevelopDir: "config/aws/develop-buildspec.yml",
    buildSpecMasterDir: "config/aws/master-buildspec.yml",
    codeBuild: "code-build",
    codePipeline: "code-pipeline",
    branchDevelop: "develop",
    branchMaster: "master"
  },
  messages: {
    awsAccesKey:
      "Check your Access key and Secret Access key for aws, Run aws configure for configure this information.",
    gitInitProyect: "Choose where do you want to start from",
    gitInitClose: "Bye",
    gitInitHellow:
      "Hello! I will help you generate basic files and folders for your app."
  }
};
