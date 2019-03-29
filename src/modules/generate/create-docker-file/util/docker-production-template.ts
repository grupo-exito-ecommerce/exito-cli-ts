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
  # RUN echo "Start login proccess, with the auto-login"
  # RUN vtex login exito --verbose
  # RUN echo "Use environment develop to link the current component"
  # RUN vtex use develop
  # RUN echo "Use the link command from exito"
  # RUN exito vtex link all --verbose
  # RUN echo "Finsih proccess, component link in the workspace develop"`};
