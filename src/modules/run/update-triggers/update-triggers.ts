import { logger } from "../../../shared";
import { runTriggers } from "./run-trigger";

export default async () => {
  logger.info("running put-repository-triggers")
  runTriggers("put-repository-triggers");
};
