import { AwsCredentials, logger } from "./../../shared";
import { saveAccountAws } from "../../conf";

// Método que recibe un objeto con las credenciales y las guarda.
export const saveCredentials = function(credentials: AwsCredentials) {
  try {
    // 1.  Guardo las credenciales indicadas
    saveAccountAws(credentials);
    return true;
  } catch (e) {
    logger.debug(e);
  }
};

export default async (username: string, password: string) => {
  try {
    let user: AwsCredentials = {
      username: username,
      pwd: password
    };
    let credentials = await saveCredentials(user);
    if (credentials) {
      logger.info("Your credentials has ven saved");
    } else {
      logger.error("Error on save your credentials");
    }
  } catch (e) {
    logger.debug(e);
  }
};
