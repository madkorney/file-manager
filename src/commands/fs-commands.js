import fs from 'fs/promises';
import { existsSync as pathExists } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import * as errors from '../common/error-handler.js';
import {stdin, stdout} from 'process';
import { constants } from 'node:fs';

export const cat = async (pathToFile, currentPath) => {
  // Read file and print it's content in console, return nothing
  if (pathToFile === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no file, stop
    return false;
  }
  const pathToSourceFile = path.resolve(currentPath, pathToFile);

  try {
    const fd = await fs.open(pathToSourceFile);
    const readStream = fd.createReadStream();

    pipeline(
      readStream,
      stdout,
      (err) => {
        if (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
          return false;
        }
        return true;
      }
    );
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const add = async (newFileName, currentPath) => {
  // Create empty file in current working directory:
  if (newFileName === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no file, stop
    return false;
  }

  const pathToNewFile = path.resolve(currentPath, newFileName);
  console.log(pathToNewFile);

  try {
    const fd = await fs.open(pathToNewFile, 'wx');
    const writeStream = fd.createWriteStream();
    writeStream.close();
    console.log(`file ${newFileName} created`);
    return true;
  }
  catch (err){
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const rn = async (pathToSourceFile, newFileName, currentPath) => {
  // Rename file
  if (pathToSourceFile === '' || newFileName === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no source file/ no dest name
    return false;
  }

  const sourceFileName = path.parse(pathToSourceFile).base;
  const fullPathToSourceFile = path.resolve(currentPath, pathToSourceFile);
  const fullPathToDestinationFile = path.resolve(currentPath, path.parse(pathToSourceFile).dir, newFileName);

  try {
    await fs.rename(fullPathToSourceFile, fullPathToDestinationFile);
    console.log(`file ${sourceFileName} renamed to ${newFileName}`);
    return true;
  }
  catch {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const cp = async (pathToSourceFile, pathToNewDir, currentPath) => {
  // Copy file, reurn true is success
  if (pathToSourceFile === '' || !pathExists(path.resolve(currentPath, pathToNewDir))) {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no source file or no dest folder, stop
    return false;
  }

  const sourceFileName = path.parse(pathToSourceFile).base;
  const fullPathToSourceFile = path.resolve(currentPath, pathToSourceFile);
  const fullPathToDestinationFile = path.resolve(currentPath, pathToNewDir, sourceFileName);

  try {
    await fs.copyFile(fullPathToSourceFile, fullPathToDestinationFile, constants.COPYFILE_EXCL);
    console.log(`file ${sourceFileName} copied to ${pathToNewDir}`);
    return true;
  }
  catch {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}


export const rm = async (pathToTargetFile, currentPath) => {
  // Delete file: return true on success
  if (pathToTargetFile === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no source file
  }

  const targetFileName = path.parse(pathToTargetFile).base;
  const fullPathToTargetFile = path.resolve(currentPath, pathToTargetFile);


  try {
    await fs.rm(fullPathToTargetFile);
    console.log(`file ${targetFileName} deleted`);
    return true;
  }
  catch {
    console.log(errors.OPERATION_ERROR_MESSAGE);
    return false;
  }
}

export const mv = async (pathToFile, pathToNewDir, currentPath) => {
  // Move file (same as copy but initial file is deleted):
  let successMove = false;
  if (cp(pathToFile, pathToNewDir, currentPath)) {
    successMove = rm(pathToFile, currentPath)
  };
  return successMove;
}