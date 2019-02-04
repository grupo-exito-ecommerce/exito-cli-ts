import fs from "fs";
let path = require("path");
let _ = require("lodash");
const filePath = "../../../../../config.json";
import log from "../../../shared/logger";
import { Credentials } from "./../../../shared/models/global";
const message =
  "No have aws credentials, save your aws credentials for clone projects";

export default async () => {
  try {
    const exist = await fs.existsSync(path.join(__dirname, filePath));
    if (exist) {
      // Do something if the file exist
      const information = await fs.readFileSync(
        path.join(__dirname, filePath),
        {
          encoding: "utf8"
        }
      );
      let credential: { user: Credentials } = JSON.parse(information);
      if (!_.isEmpty(credential.user)) {
        log.debug("Current credentials:");
        log.info(`user name: ${credential.user.username}`);
        log.info(`user password: ${credential.user.pwd}`);
      } else {
        log.debug(message);
      }
    } else {
      log.debug(message);
    }
  } catch (e) {
    log.debug(e);
  }
};
