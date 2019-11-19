import { runGitCommand } from "./../util/run-git-commands";
import { readDirectoryByFiles, logger } from "../../../../shared";
const directory = process.cwd() + "/";

export default async (commandToUse: string) => {
  logger.info("Running git command in all projects selected");
  logger.info(commandToUse);

  // 1. Leer el directorio actual y obtener los proyectos disponibles con la carpeta .git
  const projectsInCurrentDirectory: string[] = await readDirectoryByFiles(
    directory,
    ["manifest.json"],
    "Pick the projects to use",
    "Select the projects"
  );

  if (!projectsInCurrentDirectory) {
    process.exit(1);
  }

  runGitCommand(projectsInCurrentDirectory, commandToUse);
};
