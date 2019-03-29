// Lista de comandos empleados para vtex
export const consts = {
  link: 'vtex link',
  publish: 'vtex publish',
  workspace_create: 'vtex workspace create',
  github_account: 'grupo-exito-ecommerce',
  config_repository: 'exito-vtex-config',
  authtoken: 'https://demoauth--exito.myvtex.com/exito/token',
  environment: {
    develop: 'dev',
    production: 'prod'
  },
  // configuration aws cloud-formation for vtex
  aws_template: {
    configDir: 'config',
    cloudFormationDir: 'cloud-formation',
    themeDevelop: 'develop-template',
    themeMaster: 'master-template',
    buildSpecDevelopDir: 'config/aws/develop-buildspec.yml',
    buildSpecMasterDir: 'config/aws/master-buildspec.yml',
    codeBuild: 'code-build',
    codePipeline: 'code-pipeline',
    branchDevelop: 'develop',
    branchMaster: 'master'
  },
  messages: {
    awsAccesKey: 'Check your Access key and Secret Access key for aws, Run aws configure for configure this information.',
    gitInitProyect: 'Choose where do you want to start from',
    gitInitClose: 'Bye',
    gitInitHellow: 'Hello! I will help you generate basic files and folders for your app.'
  }
};
