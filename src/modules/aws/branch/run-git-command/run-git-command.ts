import { runGitCommand } from "./../util/run-git-commands";
import log from "../../../../shared/logger";
import { readDirectoryByFiles } from "../../../../shared/util/read-directory";
const directory = process.cwd() + "/";

export default async (commandToUse: string) => {
  log.info("Running git command in all projects selected");
  log.info(commandToUse);

  // 1. Leer el directorio actual y obtener los proyectos disponibles con la carpeta .git
  const projectsInCurrentDirectory: string[] = await readDirectoryByFiles(
    directory,
    ["manifest.json", ".git"],
    "Pick the projects to use",
    "Select the projects"
  );

  if (!projectsInCurrentDirectory) {
    process.exit(1);
  }

  runGitCommand(projectsInCurrentDirectory, commandToUse);
};
