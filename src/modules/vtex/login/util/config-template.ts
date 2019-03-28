import { ConfigVtexJson } from './../../../../shared/models/global';

export const getConfigTemplate = (options: ConfigVtexJson) => {
  return `{
	"login": "${options.login}",
	"account": "${options.account}",
	"token": "${options.authToken}",
	"workspace": "${options.workspase}",
	"env": "prod"
}`;
};
