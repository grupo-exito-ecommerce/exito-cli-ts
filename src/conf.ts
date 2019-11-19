import { name as pkgName, version } from "../package.json";
import { AwsCredentials } from "./shared";
const Configstore = require("configstore");

const conf = new Configstore(pkgName);

export const saveAll = (config: any): void => {
  conf.all = config;
};

export const saveAccountAws = (credentials: AwsCredentials): void =>
  conf.set("aws_user", credentials);

export const getAll = (): any => conf.all;

export const getAwsAccount = (): AwsCredentials => conf.get("aws_user");

export const getCurrentVersion = (): string => version;

export const clear = (): void => conf.clear();
