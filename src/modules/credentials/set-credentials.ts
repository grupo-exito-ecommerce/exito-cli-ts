import { AwsCredentials } from "./../../shared/models/global";
import log from "./../../shared/logger";
import { saveAccountAws } from "../../conf";

// Método que recibe un objeto con las credenciales y las guarda.
export const saveCredentials = function (credentials: AwsCredentials) {
  try {
    // 1.  Guardo las credenciales indicadas
    saveAccountAws(credentials)
    return true;
  } catch (e) {
    log.debug(e);
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
      log.info("Your credentials has ven saved");
    } else {
      log.error("Error on save your credentials");
    }
  } catch (e) {
    log.debug(e);
  }
};
