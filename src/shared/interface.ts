export interface ContentManifest {
  vendor: string;
  name: string;
  path: string;
  dependencies: ContentDependencies;
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
  credentials: Credentials;
  project: {
    repositoryMetadata: RepositoryMetadata;
  };
  path: string;
}

export interface RepositoryList {
  repositoryName: string;
  repositoryId: string;
  title: string;
  value: string;
  selected: boolean;
}

export interface Credentials {
  username: string;
  pwd: string;
}

export interface AwsState {
  path: string;
  criteria: string;
  credentials: Credentials;
  projectList: ProjectList;
}

export interface ProjectList {
  repositories: Array<RepositoryList>;
}

export interface OptionsCommand {
  command: string;
  path: string;
  commands: string;
  position: number;
  credentials: Credentials;
  projectList: Array<RepositoryList>;
}
