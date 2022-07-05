'use strict'

import { getUserName } from './common/parse-args.js';
import * as readline from 'node:readline';
import { stdin, stdout, exit } from 'process';
import { parseCommandFromInputLine, runCommand, getCurrentPath } from './commands/commands.js';
import * as errors from './common/error-handler.js';



const userName = getUserName(process.argv);
const WELCOME_MESSAGE = `Welcome to the File Manager, ${userName}!`;
const FAREWELL_MESSAGE = `Thank you for using File Manager, ${userName}!`;
const PROMPT_MESSAGE = 'You are currently in';
const printPromptMessage = (currentPath) => {
  console.log(`${PROMPT_MESSAGE} ${currentPath}`);
}

const stopFileManager = () => {
  console.log(FAREWELL_MESSAGE);
  exit();
}

const gotExitCommandFrom = (inputLine) => {
  let gotExitCmd = inputLine.trim()
                  .toLowerCase()
                  .includes('.exit');
  return gotExitCmd;
}

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

// == listeners
rl.on('SIGINT', () => {
  stopFileManager();
});

rl.on('line', (inputLine) => {
  if (gotExitCommandFrom(inputLine)) {
    stopFileManager();
  }

  let command = parseCommandFromInputLine(inputLine);

  if (command.isResolved) {
    runCommand(command);
  } else {
    console.log(errors.INVALID_COMMAND_MESSAGE);
  }

  printPromptMessage(getCurrentPath());
});



// ========== start script
console.log(WELCOME_MESSAGE);
printPromptMessage(getCurrentPath());
