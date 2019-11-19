const Configstore = require("configstore");
import { logger } from "./../../../shared";

export default async () => {
  try {
    new Configstore("vtex", { workspace: "production" });
    logger.info("vtex json generate successfully");
  } catch (error) {
    logger.error("Error on generate the vtex file");
    process.exit(1);
  }
};
