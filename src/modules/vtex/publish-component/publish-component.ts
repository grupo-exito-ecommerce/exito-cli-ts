import log from '../../../shared/logger';

export default async function() {
  log.info('Loading publish component process');

  // 1. Creo el nombre aleatorio del workspace
  let nameWorkspace = getRamdomString();
  log.info(nameWorkspace)
  
}



const getRamdomString =():string =>{
  return `workspacepublish${makeid()}`
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}