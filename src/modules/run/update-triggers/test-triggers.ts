import { runTriggers } from "./run-trigger";
import logger from "../../../shared/logger";

export default async () => {
  logger.info("test-repository-triggers");
  runTriggers("test-repository-triggers");
};
