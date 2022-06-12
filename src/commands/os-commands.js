import {COMMANDS, OS_OPTIONS} from './commands.js';
import * as nodeos from 'node:os';
import * as errors from '../common/error-handler.js';


export const os = (option) => {
  if (!option ||
      !option.startsWith('--') ||
      !OS_OPTIONS.includes(option)) {
        console.error(errors.INVALID_PARAMETER_MESSAGE);
        return;
    }
    let funcName = option.slice(2);
    osFunctions[funcName](); // drop '--' prefix and call respective func
}

const osFunctions = {

  'architecture': function() {
        console.log(`Node.js binary was compiled for: ${nodeos.arch()}`);
      },

  'username':  function() {
        try {
          let userInformation = nodeos.userInfo();
          console.log(`OS active user name: ${userInformation.username}`);
        }
        catch (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
        }
      },

  'homedir': function() {
        try {
          let userInformation = nodeos.userInfo();
          console.log(`OS active user homedir: ${userInformation.homedir}`);
        }
        catch (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
        }
      },

  'cpus': function() {
        console.log(`logical CPU cores info:`);
        console.log(nodeos.cpus());
      },

  'cpuz': function() {
      console.log(`logical CPU cores info:`);
      console.table(nodeos.cpus(),['model', 'speed']);
      for (let cpu of nodeos.cpus()) {
        console.table(cpu);
      }
    },

  'EOL': function() {
      let marker = nodeos.EOL
      console.log(`The OS-specific end-of-line marker is "${marker === `\n`? '\\n' : '\\r\\n'}"`);
    },
};












