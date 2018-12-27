export const filterProjects = async (projectsList: any, term: any) => {
  return await projectsList.repositories.filter((item: any) => {
    return Object.keys(item).find(element => {
      if (
        typeof item[element] === "string" ||
        item[element] instanceof String
      ) {
        // Busco los projectos de acuerdo al termino ingresado por el usuario
        let isSelected =
          item[element].toUpperCase().indexOf(term.toUpperCase()) !== -1;
        // if (isSelected) {
        //   // valido si  el projecto fue seleccionados
        //   isSelected = item.selected === true;
        // }
        return isSelected;
      } else {
        return false;
      }
    });
  });
};
