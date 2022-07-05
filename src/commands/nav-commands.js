import path from 'path';
import fs from 'fs/promises';
import { existsSync as pathExists } from 'fs';
import * as errors from '../common/error-handler.js';

export const up = (currentPath) => {
  let updatedPath = path.join(currentPath,'..');
  return updatedPath;
}

export const ls = async (currentPath) => {
  try {
    const dirContent = await fs.readdir(currentPath, {withFileTypes: true});
    console.log(`content of ${currentPath}:`);
    let dirNames = [];
    let fileNames = [];
    for (let item of dirContent) {
      if (item.isFile()) {
        fileNames.push(item.name);
      } else {
        dirNames.push(`[${item.name}]`);
      }
    }
    dirNames.sort((a,b) => {
                return b.toLowerCase() > a.toLowerCase()
              })
            .forEach((item) => {
              console.log(item)
              });
    fileNames.sort((a,b) => {
                return b.toLowerCase() > a.toLowerCase()
              })
              .forEach((item) => {
                console.log(item)
              });
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const cd = (currentPath, targetPath) => {

  let resolvedTargetPath = path.resolve(currentPath, targetPath);

  if (!pathExists(resolvedTargetPath)) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return currentPath;
  }

  return resolvedTargetPath;
}