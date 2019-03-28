export default {
  clone: {
    alias: 'c',
    description:
      'Clone specific list of projectos from aws, if your add the option <all>, this automatical download all projects found with the specific <criteria>',
    handler: './aws/clone/clone-projects',
    requiredArgs: 'criteria',
    optionalArgs: ['all']
  },
  login: {
    alias: 'l',
    description:
    'Set credentials for vtex',
    handler: './vtex/login/login-vtex',
    requiredArgs: ['account','workspace','email']
  },
  vtex: {
    alias: 'v',
    description:
      'Execute specific command from vtex, the current commands suport is: <link>, <publish>',
    handler: './vtex/run-command/run-command',
    requiredArgs: 'command',
    optionalArgs: ['all']
  },
  publish: {
    alias: 'p',
    description:
      'Publish only one component into Vtex, This process create one ramdon workspace in Vtex and publish the component located in the current folder',
    handler: './vtex/publish-component/publish-component'
  },
  init: {
    alias: 'i',
    description: 'Create basic files and folders for your VTEX app',
    handler: './github/init/index'
  },
  create: {
    description: 'Command to create options',
    workspace: {
      alias: 'w',
      description: 'Create the workspaces config for develops',
      handler: './vtex/create-workspace/create-workspace'
    }
  },
  generate: {
    description: 'Generate options for the project',
    config: {
      alias: 'c',
      description: 'Get the last config  for projects',
      handler: './vtex/create-config-project/get-config'
    },
    template: {
      alias: 't',
      description:
        'Create the template for aws cloud-formation for mount the infra structure for continuos integration',
      handler: './vtex/create-template-cloud-formation/create-template',
      requiredArgs: ['repository']
    }
  },
  credentials: {
    description: 'Manage your credentials for aws',
    get: {
      alias: 'g',
      description: 'Gets the current credentials used in aws',
      handler: './aws/config/get-credentials'
    },
    clear: {
      alias: 'c',
      description: 'Clear the current credentials used in aws',
      handler: './aws/config/clear-credentials'
    },
    set: {
      alias: 's',
      description: 'Sets the current credentials for aws',
      handler: './aws/config/set-credentials',
      requiredArgs: ['username', 'pwd']
    }
  },
  handler: './',
  options: [
    {
      description: 'show help information',
      long: 'help',
      short: 'h',
      type: 'boolean'
    }
  ]
};

