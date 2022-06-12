import path from 'path';
import fs from 'fs/promises';
import { existsSync as pathExist } from 'fs';
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
    dirNames.sort();
    fileNames.sort();
    dirNames.forEach(item => console.log(item));
    fileNames.forEach(item => console.log(item));
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const cd = (currentPath, targetPath) => {
  let updatedPath = currentPath;
  if (path.isAbsolute(targetPath)) {
    updatedPath = targetPath;
  } else {
    updatedPath = path.resolve(currentPath, targetPath);
  }

  if (!pathExist(updatedPath)) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return currentPath;
  }

  return updatedPath;
}