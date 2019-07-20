export default {
  credentials: {
    description: "Manage your credentials for aws",
    get: {
      alias: "g",
      description: "Gets the current credentials used in aws",
      handler: "./credentials/get-credentials"
    },
    clear: {
      alias: "c",
      description: "Clear the current credentials used in aws",
      handler: "./credentials/clear-credentials"
    },
    set: {
      alias: "s",
      description: "Sets the current credentials for aws",
      handler: "./credentials/set-credentials",
      requiredArgs: ["username", "pwd"]
    }
  },
  aws: {
    description: "Aws options",
    clone: {
      alias: "c",
      description:
        "Clone specific list of projectos from aws, if your add the option <all>",
      handler: "./aws/clone/clone-projects",
      requiredArgs: "criteria",
      optionalArgs: ["branch", "all"]
    }
  },
  run: {
    description: "Execute options with the cli",
    triggers: {
      alias: "t",
      description: "Run a local triggers.json",
      handler: "./run/update-triggers/update-triggers"
    },
    overWriteDependencies: {
      alias: "ov",
      description:
        "Overwrite the current dependencies in base to the file `update-dependencies.json`",
      handler: "./run/overwrite-dependencies/overwrite-dependencies",
      requiredArgs: ["criteria"]
    }
  },
  init: {
    alias: "i",
    description: "Create basic files and folders for your VTEX app",
    handler: "./github/init/index"
  },
  generate: {
    description: "Generate options for the project",
    configDependencies: {
      alias: "cd",
      description:
        "Create file config.json with the current dependencies for vtex projects",
      handler:
        "./generate/update-dependencies/generate-current-dependencies/generate-current-dependencies",
      requiredArgs: ["criteria"]
    },
    vtexJson: {
      alias: "v",
      description: "Create the json file config of vtex",
      handler: "./generate/create-vtex-json/create-vtex-json"
    },
    workspaces: {
      alias: "w",
      description: "Create the workspaces config for develops",
      handler: "./generate/create-workspace/create-workspace"
    },
    sonar: {
      alias: "s",
      description: "Create the sonar file for test",
      handler: "./generate/create-sonar-file/create-sonar-file",
      requiredArgs: ["repository", "version", "src"]
    },
    trigger: {
      alias: "t",
      description: "Create the triggers config for the indicate proyects",
      handler: "./generate/create-triggers-code-commit/create-triggers",
      requiredArgs: ["arn"]
    },
    triggerConfig: {
      alias: "tc",
      description:
        "Create the trigger-config file for indicate the trigger options",
      handler: "./generate/create-triggers-example-custom-data/index"
    }
  },
  vtex: {
    description: "Vtex options",
    run: {
      alias: "v",
      description:
        "Execute specific command from vtex, the current commands suport is: <link>, <publish>",
      handler: "./vtex/commands/run-command/run-command",
      requiredArgs: "command",
      optionalArgs: ["all"]
    },
    install: {
      alias: "ni",
      description:
        "Install the dependencies in the curren proyect with npm or yarn",
      handler: "./vtex/install/install",
      requiredArgs: "adminPackage"
    },
    coverage: {
      alias: "co",
      description: "Run the coverage process in the proyect",
      handler: "./vtex/coverage/coverage"
    },
    publish: {
      alias: "p",
      description: "Publish only one component into Vtex",
      handler: "./vtex/commands/publish-component/publish-component"
    },
    login: {
      alias: "l",
      description: "Set credentials for vtex in the config file from vtex",
      handler: "./vtex/commands/login/login-vtex",
      requiredArgs: ["account", "workspace", "email"]
    },
    setVendor: {
      description: "Set the vendor name in the manifest file",
      handler: "./vtex/update-manifest/update-manifest",
      requiredArgs: ["vendor"]
    }
  },
  handler: "./",
  options: [
    {
      description: "show help information",
      long: "help",
      short: "h",
      type: "boolean"
    }
  ]
};
