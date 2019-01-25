import {
  ContentDependencies,
  ContentManifest,
  ObjLevelImportance
} from "../../../shared/interface";
// variable que posee la lista de dependencias ordenadas por nivel
var dependenciesList: Array<ContentDependencies> = [];
// variable que posee la información  de los manifest.json
var manifests: Array<ContentManifest> = [];
import log from "../../../shared/logger";

// 3. Método que permite obtener el orden de dependencias, arma un array donde se indica el grado de importancia por medio de un nivel
exports.getListProyects = async function(manifest: Array<ContentManifest>) {
  manifests = manifest;

  // 1. Armo un array con dependencias de todos los componentes de la carpeta indicada. se inicia a nvl 0 ya que no hay dependencias validadas aun
  await manifests.forEach(item => {
    let obj = {
      level: 0,
      title: `${item.vendor}.${item.name}`,
      value: `${item.vendor}.${item.name}`,
      selected: true
    };
    dependenciesList.push(obj);
  });

  // 2. Recorro todas las dependencias de cada uno de los proyectos y valido sus dependencias, armando así el orden para importar los componentes
  await manifests.forEach((_item, index) => {
    resolverDenpendecies(manifests[index].dependencies);
  });

  return dependenciesList;
};

// Método para armar la estructura de nivel para las dependencias,
// Indica desde el nivel mas bajo hasta el mas alto el orden en que se van a compilar los componentes.
export const findLevelDependency = function(item: string) {
  let obj: ObjLevelImportance = {
    level: 0,
    title: item,
    value: item,
    selected: true
  };

  var found = dependenciesList.find((res: ContentDependencies) => {
    if (res.value == item) {
      res.level += 1;
      return true;
    } else return false;
  });

  if (!found) {
    dependenciesList.push(obj);
  }

  dependenciesList = dependenciesList.sort((a, b) => a.level - b.level);
};

// Metodo que valida si ya hay dependencias de un componente y categoriza su nivel de dependencia (Función recursiva que valida en todas las dependencias si hay alguna que necesite de alguien más
// let manifestItem: ContentManifest;

export const resolverDenpendecies = async (
  dependencies: ContentDependencies
) => {
  for (const prop in dependencies) {
    var manifest = manifests.find(res => {
      if (`${res.vendor}.${res.name}` == prop) {
        log.debug(`dependencie found: ${prop}`);
        findLevelDependency(prop);
        return true;
      } else {
        // log.debug(`dependencie not found: ${prop}`);
        return false;
      }
    });

    if (manifest) {
      resolverDenpendecies(manifest.dependencies);
    }
  }
};
