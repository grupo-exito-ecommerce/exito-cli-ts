
export const developDocker = () => {
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
  RUN exito generate vtex_json
  RUN exito vtex login exito dev mrestrepoa@grupo-exito.com --verbose
  RUN exito vtex set_vendor exito
  RUN exito vtex run link all --verbose
  RUN echo "Finsih proccess, component link in the workspace develop"`};