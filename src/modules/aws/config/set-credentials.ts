import { Credentials } from "./../../../shared/models/global";
import log from "../../../shared/logger";
import fs from "fs";
let path = require("path");

// Método para preguntar las credenciales de aws al usuario
export const saveCredentials = function(credentials: Credentials) {
  try {
    // 1.  Guardo las credenciales indicadas
    fs.writeFile(
      path.join(__dirname, "../../../../../config.json"),
      JSON.stringify({ user: credentials }, null, 2),
      "utf8",
      () => {
        // error handling and whatever
        return false;
      }
    );
    return true;
  } catch (e) {
    log.debug(e);
  }
};

export default async (username: string,password:string) => {
  try {
    let user: Credentials = {
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
