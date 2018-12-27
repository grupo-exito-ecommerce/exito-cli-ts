import fs from "fs";
var path = require("path");

// Método para preguntar las credenciales de aws al usuario
export const saveCredentials = function() {
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
};
