import {
  ContentManifestOverwrite,
  getManifestsContent,
  logger,
  readDirectoryByFiles,
  runOnlyCommand
} from "../../../shared";

export default async (location: string, command: string) => {
  const directory = process.cwd() + "/";
  logger.info(directory);
  logger.info(location, command);

  // First get the projects list to use
  const projectsInCurrentDirectory: string[] = await readDirectoryByFiles(
    directory,
    ["manifest.json"],
    "Pick the projects to use",
    "Select the projects"
  );

  // 2. Get manifest content
  let manifest = await findProjectContent(projectsInCurrentDirectory);

  if (!manifest.length) {
    logger.error("No manifest content");
    process.exit(1);
  }

  await manifest.map(async item => {
    const name = `${item.vendor}.${item.name}`;
    const commandInterpolation = command.replace("${name}", name);
    const finalCommand = `cd ${item.path} && ${location} && ${commandInterpolation}`;
    await runOnlyCommand(finalCommand);
  });
  //  Make the interpolation in the command passed
};

const findProjectContent = async (files: string[]) => {
  // si hay directorios, paso a buscar el archivo manifest.json y obtener su contenido
  const manifests: ContentManifestOverwrite[] = await getManifestsContent(
    files
  );
  if (manifests.length) {
    return manifests;
  } else {
    return [];
  }
};
