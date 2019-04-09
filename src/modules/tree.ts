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
      optionalArgs: ["all"]
    }
  },
  infra: {
    description: "Proyects infra options",
    update: {
      alias: "c",
      description: "Update the continuous integration and commit the changes.",
      handler: "./aws/infra/update-infra/update-infra"
    }
  },
  init: {
    alias: "i",
    description: "Create basic files and folders for your VTEX app",
    handler: "./github/init/index"
  },
  generate: {
    description: "Generate options for the project",
    vtex_json: {
      alias: "v",
      description: "Create the json file config of vtex",
      handler: "./generate/create-vtex-json/create-vtex-json"
    },
    workspaces: {
      alias: "w",
      description: "Create the workspaces config for develops",
      handler: "./generate/create-workspace/create-workspace"
    },
    config: {
      alias: "c",
      description: "Get the last config  for projects",
      handler: "./generate/create-config-project/get-config"
    },
    docker: {
      alias: "d",
      description:
        "Create the docker file for aws code-build in environment production (prod) and develop (dev)",
      handler: "./generate/create-docker-file/create-docker-file",
      requiredArgs: ["environment", "vendor", "workspace", "email"]
    },
    sonar: {
      alias: "s",
      description: "Create the sonar file for test",
      handler: "./generate/create-sonar-file/create-sonar-file",
      requiredArgs: ["repository", "version", "src"]
    },
    template: {
      alias: "t",
      description:
        "Create the template for aws cloud-formation for mount the infra structure for continuos integration",
      handler: "./generate/create-template-cloud-formation/create-template",
      requiredArgs: ["repository"]
    }
  },
  vtex: {
    description: "Vtex options",
    run: {
      alias: "v",
      description:
        "Execute specific command from vtex, the current commands suport is: <link>, <publish>",
      handler: "./vtex/run/run-command/run-command",
      requiredArgs: "command",
      optionalArgs: ["all"]
    },
    publish: {
      alias: "p",
      description: "Publish only one component into Vtex",
      handler: "./vtex/run/publish-component/publish-component"
    },
    login: {
      alias: "l",
      description: "Set credentials for vtex in the config file from vtex",
      handler: "./vtex/run/login/login-vtex",
      requiredArgs: ["account", "workspace", "email"]
    },
    set_vendor: {
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
