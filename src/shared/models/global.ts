export interface ContentManifest {
  vendor: string;
  name: string;
  path: string;
  dependencies: ContentDependencies;
  version: string;
  changelog?: {
    version: string;
    dependencies: object;
  };
}

export interface ContentManifestOverwrite {
  vendor: string;
  name: string;
  path: string;
  dependencies: any;
  version: string;
  changelog?: {
    version: string;
    dependencies: object;
  };
}

export interface OptRunCommand {
  path: string;
  command: string;
}

export interface LogContent {
  log: string;
}

export interface ContentDependencies {
  value: string;
  level: number;
}

export interface OptExecuteCommand {
  position: number;
  commands: string;
  dependenciesList: Array<ContentDependencies>;
  manifests: Array<ContentManifest>;
}

export interface ObjLevelImportance {
  level: number;
  title: string;
  value: string;
  selected: boolean;
}

export interface OptCommand {
  orderList: boolean;
  directory: string;
  command: string;
}

export interface CloneOptCommand {
  _: Array<string>;
}

export interface Answer {
  command: string;
}

export interface RepositoryMetadataResponse {
  repositoryMetadata: RepositoryMetadata;
}

export interface RepositoryMetadata {
  defaultBranch: string;
  repositoryName: string;
  cloneUrlSsh: string;
  lastModifiedDate: number;
  repositoryId: string;
  cloneUrlHttp: string;
  creationDate: number;
  arn: string;
  accountId: string;
}

export interface RepositoryOptions {
  credentials: AwsCredentials;
  project: {
    repositoryMetadata: RepositoryMetadata;
  };
  path: string;
  branch: string;
}

export interface RepositoryList {
  repositoryName: string;
  repositoryId: string;
  repositoryMetadata: RepositoryMetadata;
  title: string;
  value: string;
  selected: boolean;
}

export interface AwsCredentials {
  username: string;
  pwd: string;
}

export interface AwsState {
  path: string;
  criteria: string;
  credentials: AwsCredentials;
  projectList: ProjectList;
}

export interface ProjectList {
  repositories: Array<RepositoryList>;
}

export interface AwsExecuteCommandClone {
  path: string;
  credentials: AwsCredentials;
  projectList: RepositoryList[];
  branch: string;
  position: number;
}

export interface OptionsCommand {
  command: string;
  path: string;
  commands: string;
  position: number;
  credentials: AwsCredentials;
  projectList: Array<RepositoryList>;
}

export interface Manifest {
  name?: string;
  title?: string;
  vendor?: string;
  version: string;
  dependencies?: {};
  builders?: {
    [builder: string]: string;
  };
  settingsSchema?: {};
  description?: string;
  categories?: string[];
  registries?: string[];
  mustUpdateAt?: string;
  latest?: string;
}

export interface DependenciesListModel {
  level: number;
  title: string;
  value: string;
  selected: boolean;
}

export interface CreateTemplate {
  namefile: string;
  nameRepository: string;
  nameBranch: string;
  buildSpecDir: string;
  codeBuildName: string;
  codePipeLineName: string;
}

export interface CreateTemplateCloudFormation {
  codeCommitProyects: Array<string>;
  nameBranch: string;
  buildSpecDir: string;
  codeBuildName: string;
  codePipeLineName: string;
}

export interface CustomDataTrigger {
  codeBuild: string;
  vendor: string;
  workspace: string;
  codeCommitBranch: string;
  urlToClone: string;
  linkCommand: string;
  publishCommand: string;
}

export interface BranchTriggerInformation {
  customData: CustomDataTrigger;
  name: string;
}

export interface CreateTriggerCodeCommit {
  codeCommitProject: string;
  branches: Array<BranchTriggerInformation>;
  updateReference: Array<string>;
  destinationArn: string;
}

export interface ConfigVtexJson {
  login: string;
  token: string;
  account: string;
  workspace: string;
  env: string;
}

export interface DockerConfiguration {
  vendor: string;
  email: string;
  workspace: string;
}
