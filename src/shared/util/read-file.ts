import log from "../logger";
const fs = require("fs");

const readFile = async (dir: string, isJson: boolean): Promise<any> => {
  // Metodo que trae el contenido de un directorio indicado
  try {
    if (fs.existsSync(dir)) {
      // Do something
      let fileContent: any = isJson
        ? await JSON.parse(fs.readFileSync(dir, "utf8"))
        : await fs.readFileSync(dir, "utf8");
      if (fileContent) {
        log.info(`File found in: ${dir}`);
        return fileContent;
      } else {
        return [];
      }
    } else {
      log.info(`Filess not found: ${dir}`);
      return [];
    }
  } catch (error) {
    log.info(`error on read the file: ${dir} check the content`);
    return [];
  }
};

export const readFileInDirectory = async (
  dir: string,
  isJson: boolean
): Promise<any> => {
  let fileContent: any = await readFile(dir, isJson);
  if (fileContent.length) {
    return fileContent;
  } else {
    return [];
  }
};
