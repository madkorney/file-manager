import {osCommands} from '../commands/os-commands.js';

//getting user name from script launch parameters array
export const getUserName = (processArgs) => {
  let userName = '';
  let userArgs = parseArgs(processArgs);
  let userNameResolved = false;

  userArgs.forEach((parameter)=> {
    if (Object.keys(parameter).includes('username')) {
      userName = parameter.username;
      userNameResolved = true;
    }
  });

  if (!userNameResolved) {
    console.log(`user name is not recognized. using default OS username..`);
    userName = osCommands.username();
    if (!userName) {
      userName = 'unknown_meatbag';
    }
  }
  return userName;
};

const parseArgs = (processArgs) => {
  //return array of user parameter objects  [{parametr:value}]
  let args =  processArgs.slice(2);
  let userArgs = [];

  const extractParameter = (paramString) => {
    // extract name and valeu from string  '--param-name=param-value'
    let delimiterIndex = paramString.indexOf('=');

    if (delimiterIndex === -1) {
      return false; // invalid param format, no delimiter found
    }

    let paramName = paramString.substring(2, delimiterIndex);  // omit prefix --
    let paramValue = paramString.substring(delimiterIndex + 1);
    let parametr = {
      [paramName]: paramValue,
    };

    return parametr;
  }

  args.forEach( (argChunk) => {
    if (argChunk.startsWith('--')) {
      let userArg = extractParameter(argChunk);
      if (userArg) {
        userArgs.push(userArg);
      }
    }
  });
  return userArgs;
};




