import { getRepositoryName } from "./get-repository-name";

// Método que recorre la lista de proyectos y obtiene el nombre a emplear de acuerdo a la carpeta.
export const getProjectNames = (currentDirectory: Array<string>) => {
  let repositoryNames: Array<string> = [];
  currentDirectory.map(async (item: string) => {
    repositoryNames.push(getRepositoryName(item.replace(".json", "")));
  });

  return repositoryNames;
};
