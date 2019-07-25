// Método que retorna el nombre del repositorios, se realiza obteniendo el nombre de la carpeta donde se enuentra el proyecto. por estandar lo manejamos de acuerdo al nombre del repositorio.
export const getRepositoryName = (directory: string) => {
  var isWin = process.platform === "win32";
  const dir = isWin != true ? directory.split("/") : directory.split(/[\/\\]/);
  return dir[dir.length - 1];
};
