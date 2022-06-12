

export const cat = (pathToFile, currentPath) => {
//Read file and print it's content in console, return nothing

  console.log('cat tbd'); // !

}

export const add = (newFileName, currentPath) => {
// Create empty file in current working directory:

  console.log('add tbd'); // !

  console.log(`file ${newFileName} created`);
  return true;
}

export const rn = (pathToFile, newFileName, currentPath) => {
// Rename file

  console.log('rn tbd'); // !

  console.log(`file ${pathToFile} renamed to ${newFileName}`);
  return true;
}

export const cp = (pathToFile, pathToNewDir, currentPath) => {
  // Copy file, reurn true is success

    console.log('cp tbd'); // !

    console.log(`file ${pathToFile} copied`);
    return true;
  }


  export const rm = (pathToFile, currentPath) => {
    // Delete file: return true on success

    console.log('rm tbd'); // !

    console.log(`file ${pathToFile} deleted`);
    return true;
  }

  export const mv = (pathToFile, pathToNewDir, currentPath) => {
    // Move file (same as copy but initial file is deleted):
    let successMove = false;
    if (cp(pathToFile, pathToNewDir, currentPath)) {
      successMove = rm(pathToFile, currentPath)
    };
    return successMove;
  }