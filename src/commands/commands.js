import * as oscmd  from './os-commands.js';
import * as navcmd from './nav-commands.js';
import * as fscmd from './fs-commands.js';
import * as zipcmd from './zip-commands.js';
import * as hashcmd from './hash-commands.js';

import {homedir} from 'node:os';
let currentPath = homedir(); // init for global current path. if a command can change path it should return updated current path
export const getCurrentPath = () => {
  return currentPath;
}

export const parseCommandFromInputLine = (inputLine) => {
  let command = {
    isResolved: false,
    name:'',
    argument1: '', // name isnt good but for different commands arguments have different meanings
    argument2: '',
  }
  let [commandNameCandidate, argument1Candidate, argument2Candidate] = inputLine.split(' ');

  command.isResolved = Object.keys(baseCommands).includes(commandNameCandidate);

  if (command.isResolved) {
    command.name = commandNameCandidate;
    command.argument1 = argument1Candidate || '';
    command.argument2 = argument2Candidate || '';
    //options are validated inside command calls
  }

  return command;
}

export const runCommand = (command) => {
 baseCommands[command.name](command.argument1, command.argument2);
}

const baseCommands = {
  'os': function(option){
    oscmd.os(option);
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