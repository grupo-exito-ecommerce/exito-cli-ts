import fs from "fs";
var path = require("path");
import log from "../../../../shared/logger";

// Método para preguntar las credenciales de aws al usuario
export const setCredentials = function() {
  try {
    fs.writeFile(
      path.join(__dirname, "../../../../../config.json"),
      JSON.stringify({ user: {} }, null, 2),
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
