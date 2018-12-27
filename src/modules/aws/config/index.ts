import { saveCredentials } from "./util/clearCredentials";
import log from "../../../shared/logger";

export const clearCredentials = async () => {
  let response = await saveCredentials();

  if (response) {
    log.info("Credentials has been removed");
  } else {
    log.error("Error on removed credentilas");
  }
};
