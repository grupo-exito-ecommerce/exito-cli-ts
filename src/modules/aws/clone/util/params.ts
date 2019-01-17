import log from "../../../../shared/logger";
import inquirer from "inquirer";

/**
 *  Método para obtener el criterio de busqueda a emplear para filtrar los projectos
 */
export const getCriteriaOfSearch = async (): Promise<string> => {
  // 1.  Pregunto por el indicativo a emplear para filtrar los projectos
  const questions = [
    {
      type: "input",
      name: "criteria",
      message: "Enter criteria of search or press enter to list all projects",
      validate: (criteria: string) => (criteria == undefined ? false : true)
    }
  ];

  let response: any = await inquirer.prompt(questions);

  if (response.criteria) {
    return response.criteria;
  } else {
    if (response.criteria != undefined) {
      log.debug("No criteria enter, list all projects");
      return "all";
    }
    return "none";
  }
};
