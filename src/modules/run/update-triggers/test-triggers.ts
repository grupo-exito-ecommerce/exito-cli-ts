import { logger } from "../../../shared";
import { runTriggers } from "./run-trigger";

export default async () => {
  logger.info("test-repository-triggers");
  runTriggers("test-repository-triggers");
};
