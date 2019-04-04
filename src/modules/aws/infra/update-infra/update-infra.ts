import { createGitFeature } from './util/create-git-feature';
import log from "../../../../shared/logger";
import { readDirectory } from "./util/read-directory";
import { updateConfigContinuosIntegration } from './util/update-continuos-integration';
import { incrementVersion } from './util/increment-version';

export default async () => {
    const directory = process.cwd() + '/';

    // 1. Leer el directorio actual y obtener los proyectos disponibles con la carpeta .git
    const currentDirectory: Array<string> = await readDirectory(directory);

    // 2. Entrar en cada directorio y crear la configuración de feature/infra-update-cli
    await createGitFeature(currentDirectory);

    // 3. Entrar en el directorio y eliminar la carpeta config y realizar una actualización de la infra. Tener en cuenta la creación de los templates, para ello necesitare tener el nombre del proyecto a generar la infra
    await updateConfigContinuosIntegration(currentDirectory);

    // 4. Realizo un incremento en la versión de la aplicación
    await incrementVersion(currentDirectory);

    // 5. Realizar push y integrar al master o develop
    pushChanges();

}



const pushChanges = () => {
    log.info("Push changes")
}


