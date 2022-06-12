import {os}  from './os-commands.js';
import * as navcmd from './nav-commands.js';
import * as fscmd from './fs-commands.js';
import * as zipcmd from './zip-commands.js';
import * as hashcmd from './hash-commands.js';

import {homedir} from 'node:os';
let currentPath = homedir(); // init for global cur path. if a command can change path it should return new path
export const getCurrentPath = () => {
  return currentPath;
}

export const parseCommandFromInputLine = (inputLine) => {
  let command = {
    isResolved: false,
    name:'',
    option1: '',
    option2: '',
  }
  let [nameCandidate, option1Candidate, option2Candidate] = inputLine.split(' ');

  command.isResolved = Object.keys(baseFunctions).includes(nameCandidate);

  if (command.isResolved) {
    command.name = nameCandidate;
    command.option1 = option1Candidate || '';
    command.option2 = option2Candidate || '';
    //options are validated inside command calls
  }

  return command;
}

export const runCommand = (command) => {
  baseFunctions[command.name](command.option1, command.option2);
}

const baseFunctions = {
  'os': function(option){
    os(option);
  },
  'hash': function(pathToFile){
    hashcmd.printHash(pathToFile, currentPath);
  },
  'up': function(){
    currentPath = navcmd.up(currentPath);
  },
  'cd': function(pathToTargetDir){
    currentPath = navcmd.cd(currentPath, pathToTargetDir);
  },
  'ls': function(){
    navcmd.ls(currentPath);
  },
  'cat': function(pathToFile){
    fscmd.cat(pathToFile, currentPath);
  },
  'add': function(newFileName){
    fscmd.add(newFileName, currentPath);
  },
  'rn': function(pathToFile, newFileName){
    fscmd.rn(pathToFile, newFileName, currentPath);
  },
  'cp': function(pathToFile, pathToNewDir){
    fscmd.cp(pathToFile, pathToNewDir, currentPath);
  },
  'mv': function(pathToFile, pathToNewDir){
    fscmd.mv(pathToFile, pathToNewDir, currentPath);
  },
  'rm': function(pathToFile){
    fscmd.rm(pathToFile, currentPath);
  },
  'compress': function(pathToFile, pathToDestination){
    zipcmd.compress(pathToFile, pathToDestination, currentPath)
  },
  'decompress': function(pathToFile, pathToDestination){
    zipcmd.decompress(pathToFile, pathToDestination, currentPath);
  },
};