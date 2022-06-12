import fs from 'fs/promises';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream';
import * as errors from '../common/error-handler.js';

export const compress = async (pathToFile, pathToDestination, currentPath) => {

  if (pathToFile === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no file for compress, stop
    return false;
  }
  if (pathToDestination === '') {
    pathToDestination = `${path.parse(pathToFile).base}.bro`;  // if no  target name specified - create name filename.ext.bro
  }

  const sourcePathToFile = path.resolve(currentPath, pathToFile);
  const destinationPathToFile = path.resolve(currentPath, pathToDestination);

  try {
    const fdRead = await fs.open(sourcePathToFile,'r');
    const fdWrite = await fs.open(destinationPathToFile,'w');

    const readStream = fdRead.createReadStream();
    const writeStream = fdWrite.createWriteStream();
    const compessBrotli = zlib.createBrotliCompress();

    pipeline(
      readStream,
      compessBrotli,
      writeStream,
      err => {
        if (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
        }
      }
    );

    console.log(`file ${sourcePathToFile} packed into ${destinationPathToFile}`);
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
  }
}

export const decompress = async (pathToPackedFile, pathToUnpackDestination, currentPath) => {
  if (pathToPackedFile === '') {
    console.log(errors.OPERATION_ERROR_MESSAGE); // no file for decompress, stop
    return false;
  }
  if (pathToUnpackDestination === '') {
    pathToUnpackDestination = path.parse(pathToPackedFile).name;
    // if no target name specified - create name >filename without ext (file.ext.bro -> file.ext)
  }
  const pathToSourceFile = path.resolve(currentPath, pathToPackedFile);
  const pathToDestinationFile = path.resolve(currentPath, pathToUnpackDestination);

  try {
    const fdRead = await fs.open(pathToSourceFile, 'r');
    const fdWrite = await fs.open(pathToDestinationFile, 'w');

    const readStream = fdRead.createReadStream();
    const writeStream = fdWrite.createWriteStream();
    const decompessBrotli = zlib.createBrotliDecompress();

    pipeline(
      readStream,
      decompessBrotli,
      writeStream,
      err => {
        if (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
        }
      }
    );

    console.log(`file ${pathToSourceFile} unpacked into ${pathToDestinationFile}`);
  }
  catch (err) {
    console.log(errors.OPERATION_ERROR_MESSAGE);
  }

}

// export const decompressZ = async () => {
//   const pathToFilesFolder = 'files/';
//   const sourceFileName = 'archive.gz';
//   const destinationFileName = 'fileDecompressed.txt';
//   const sourcePathToFile = path.join(__dirname, pathToFilesFolder, sourceFileName);
//   const destinationPathToFile = path.join(__dirname, pathToFilesFolder, destinationFileName);

//   try {
//     const writeStream = fs.createWriteStream(destinationPathToFile, 'utf-8');
//     const readDataBuffer = fs.readFile(sourcePathToFile, (err, data) => {
//       if (err) {
//         console.log('An error occurred:', err.message);
//       }
//       const buffer = Buffer.from(data, 'base64');
//       zlib.unzip(buffer, (err, buffer) => {
//         if (err) {
//           console.error('An error occurred:', err.message);
//           process.exitCode = 1;
//         }
//         writeStream.write(buffer.toString());
//       });

//     } );


//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
//   }; 