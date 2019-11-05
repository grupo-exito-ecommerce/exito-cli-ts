import { runTriggers } from "./run-trigger";
import logger from "../../../shared/logger";

export default async () => {
  logger.info("running put-repository-triggers")
  runTriggers("put-repository-triggers");
};
