import * as nodeos from 'node:os';
import * as errors from '../common/error-handler.js';


export const os = (option) => {
  let funcName = option.slice(2);// drop '--' prefix
  if (!option ||
      !option.startsWith('--') ||
      !Object.keys(osCommands).includes(funcName)) {
        console.error(errors.INVALID_PARAMETER_MESSAGE);
        return;
    }
    osCommands[funcName](); // call respective func
}

export const osCommands = {

  'architecture': function() {
        console.log(`Node.js binary was compiled for: ${nodeos.arch()}`);
      },

  'username':  function() {
        try {
          let userInformation = nodeos.userInfo();
          console.log(`OS active user name: ${userInformation.username}`);
          return userInformation.username;
        }
        catch (err) {
          console.log(errors.OPERATION_ERROR_MESSAGE);
          return false;
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
        let cpusList = nodeos.cpus().map((cpu) => {
            cpu.speedInGhz = `${cpu.speed/1000}00 GHz`;
            cpu.model = cpu.model.trim();
            return cpu;
          });
        console.table(cpusList, ['model', 'speedInGhz']);
      },

  'EOL': function() {
      let marker = nodeos.EOL;
      console.log(`The OS-specific end-of-line marker is "${marker === `\n`? '\\n' : '\\r\\n'}"`);
    },
};












