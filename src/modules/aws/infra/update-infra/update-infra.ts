import log from "../../../../shared/logger";

export default async () => {
    log.info("Update infra ")

    // 1. Leer el directorio actual y obtener los proyectos disponibles con la carpeta .git
    readDirectory();

    // 2. Entrar en cada directorio y crear la configuración de feature/infra-update-cli
    createGitFeature();

    // 3. Entrar en el directorio y eliminar la carpeta config y realizar una actualización de la infra. Tener en cuenta la creación de los templates, para ello necesitare tener el nombre del proyecto a generar la infra
    updateConfigContinuosIntegration();

    // 4. Realizar push y integrar al master o develop
    pushChanges();

}


const readDirectory = () => {
    log.info("Read directory")
}


const createGitFeature = () => {
    log.info("Create feature git")
}

const updateConfigContinuosIntegration = () => {
    log.info("Update continuos integration config")
}

const pushChanges = () => {
    log.info("Push changes")
} 