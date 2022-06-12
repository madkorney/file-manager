import {osFunctions} from '../commands/os-commands.js';

//parsing user name from script launch parameters array
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
    console.error(`user name is not recognized. using default OS username..`);
    userName = osFunctions.username();
  }
  return userName;
};

// parse script launch parameters
const parseArgs = (processArgs) => {
  //return array of user parameter objects  [{parametr:value}]
  let args =  processArgs.slice(2);
  let userArgs = [];

  const extractParameter = (paramString) => {
    // extract name and valeu from string  '--param-name=param-value'
    let delimiterIndex = paramString.indexOf('=');

    if (delimiterIndex === -1) {
      return {} // invalid param format, no delimiter found
    }

    let paramName = paramString.substring(2, delimiterIndex);  // omit prefix --
    let paramValue = paramString.substring(delimiterIndex + 1);
    let parametr = {
      [paramName]: paramValue,
    };

    return parametr;
  }

  args.forEach( (item) => {
    if (item.startsWith('--')) {
      let userArg = extractParameter(item);
      if (Object.keys(userArg).length !== 0) {
        userArgs.push(userArg);
      }
    }
  });
  return userArgs;
};




