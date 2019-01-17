#!/usr/bin/env node
import log from "./shared/logger";
import * as pkg from "../package.json";
import tree from "./modules/tree";
import { find, run as unboundRun } from "findhelp";
import * as Bluebird from "bluebird";
import * as path from "path";
import { without } from "ramda";
import notify from "./update";

// // check updates
notify();

// // print options
const VERBOSE = "--verbose";

const run = (command: any) =>
  Bluebird.resolve(
    unboundRun.call(tree, command, path.join(__dirname, "modules"))
  );

const logToolbeltVersion = () => {
  log.debug(`Exito version: ${pkg.version}`);
};

const main = async () => {
  const args = process.argv.slice(2);

  logToolbeltVersion();

  const command = await find(tree, without([VERBOSE], args));

  await run(command);
};

const onError = (e: string) => {
  log.error("Something went wrong, I don't know what to do :(");
  log.debug(e);

  process.exit(1);
};

try {
  main().catch(onError);
} catch (e) {
  onError(e);
}

process.on("unhandledRejection", onError);
