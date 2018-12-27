import {
  OptRunCommand,
  ContentManifest,
  OptExecuteCommand
} from "../../../shared/interface";
var childProcess = require("./child_process");

const executeCommands = function(options: OptExecuteCommand) {
  let index = options.position;
  if (index < options.dependenciesList.length) {
    // Obtengo el path del projecto, buscando en la lista de manifests
    options.manifests.forEach((res: ContentManifest) => {
      if (
        `${res.vendor}.${res.name}` == options.dependenciesList[index].value
      ) {
        const optionsCommand: OptRunCommand = {
          command: options.commands,
          path: res.path
        };

        childProcess.runCommand(optionsCommand).then(() => {
          index++;
          const optionsToRun: OptExecuteCommand = {
            position: index,
            manifests: options.manifests,
            dependenciesList: options.dependenciesList,
            commands: options.commands
          };
          executeCommands(optionsToRun);
        });
      }
    });
  } else {
    process.exit();
  }
};

module.exports = {
  executeCommands
};
