import { RepositoryList } from "../../../../shared/models/global";

/**
 * Método empleado para realizar el filtro de la lista de proyectos obtenidos
 * @param projectsList
 * @param term
 */
export const filterProjects = async (
  projectsList: any,
  term: any
): Promise<Array<RepositoryList>> => {
  return await projectsList.repositories.filter((item: any) => {
    return Object.keys(item).find(element => {
      if (
        typeof item[element] === "string" ||
        item[element] instanceof String
      ) {
        // Busco los projectos de acuerdo al termino ingresado por el usuario
        let isSelected =
          item[element].toUpperCase().indexOf(term.toUpperCase()) !== -1;

        return isSelected;
      } else {
        return false;
      }
    });
  });
};
