import path from 'node:path';
import fs from 'fs/promises';
import * as errors from '../common/error-handler.js';
const { createHash } = await import('crypto');
// import * as url from 'url';
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


export const getHexHash = (pathToFile) => {
  let hash = createHash('sha256');

  try {
    let fileToEncode = await fs.readFile(
      pathToFile,
      {encoding: 'utf-8'}
    );
    hash.update(fileToEncode);
  }
  catch (err) {
    throw err;
  }

  const hashHex = hash.digest('hex');
  return hashHex;
}

export const printHash = (pathToFile, currentPath) => {
  const fullPathToFile = path.join(currentPath, filePath); // todo verify path
  try {
    let hash = getHexHash(fullPathToFile);
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
  console.log(`hash is : ${hash}`);
}



