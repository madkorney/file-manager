export const getUserName = (processArgs) => {
  const DEFAULT_NAME = 'SuperUser';//default name
  let userName = DEFAULT_NAME;
  let userArgs = parseArgs(processArgs);

  userArgs.forEach((parameter)=> {
    if (Object.keys(parameter).includes('username')) {
      userName = parameter.username;
    }
  });

  if (userName === DEFAULT_NAME) {
    console.error(`user name is not recognized. using default name ${DEFAULT_NAME}`);
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



