const Configstore = require("configstore");
import { ConfigVtexJson, logger } from "../../../../../shared";

export const saveVtexConfig = async (configuration: ConfigVtexJson) => {
  try {
    const conf = new Configstore("vtex");
    await conf.clear();
    conf.all = configuration;
    logger.info("vtex json save successfully");
  } catch (error) {
    logger.error("Error on save the vtex file");
    process.exit(1);
  }
};
