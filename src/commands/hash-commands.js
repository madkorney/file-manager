import path from 'node:path';
import {createHash} from 'crypto';
import * as errors from '../common/error-handler.js';
import * as fs from 'fs/promises';


export const getHexHash = async (pathToFile) => {
  let hash = createHash('sha256');

  try {
    let fileContent = await fs.readFile(
      pathToFile,
      {encoding: 'utf-8'}
    );
    hash.update(fileContent);
    const hashHex = hash.digest('hex');
    return hashHex;
  }
  catch {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const printHash = async (pathToFile, currentPath) => {
  const fullPathToFile = path.resolve(currentPath, pathToFile);

  let fileHash = await getHexHash(fullPathToFile);
  if (fileHash) {
    console.log(`hash for ${fullPathToFile} is : ${fileHash}`);
  }
}
