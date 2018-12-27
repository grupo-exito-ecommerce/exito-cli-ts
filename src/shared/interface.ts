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
