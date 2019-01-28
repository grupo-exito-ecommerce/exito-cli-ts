export default {
  clone: {
    alias: 'c',
    description:
      'Clone specific list of projectos from aws, if your add the option <all>, this automatical download all projects found with the specific <criteria>',
    handler: './aws/clone/clone-projects',
    requiredArgs: 'criteria',
    optionalArgs: ['all']
  },
  vtex: {
    alias: 'v',
    description:
      'Execute specific command from vtex, the current commands suport is: <link>, <publish>',
    handler: './vtex/command/run-command',
    requiredArgs: 'command',
    optionalArgs: ['all']
  },

  init: {
    alias: 'i',
    description: 'Clone project',
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
