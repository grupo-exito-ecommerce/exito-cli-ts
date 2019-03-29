export const productionDocker = () => {
    return `# Exito Build Vtex Components
    #################################
    
    FROM node:8
    
    # Install dependencies
    RUN yarn global add vtex && yarn cache clean
    RUN yarn global add exito && yarn cache clean
    
    COPY ./ /project
    
    WORKDIR /project
    RUN echo "Start Vtex proccess to link the current project"
    
    RUN vtex --version
    RUN exito --version
    RUN ls
    RUN exito generate vtexjson
    RUN exito vtex login exito demoauth mrestrepoa@grupo-exito.com --verbose
    RUN exito publish --verbose
`};
