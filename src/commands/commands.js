import {os}  from './os-commands.js';

export const COMMANDS=[
  'up',
  'cd',
  'ls',
  'cat',
  'add',
  'rn',
  'cp',
  'mv',
  'rm',
  'os',
  'hash',
  'compress',
  'decompress'
];

export const OS_OPTIONS = [
  '--cpus',
  '--EOL',
  '--homedir',
  '--username',
  '--architecture',
  '--cpuz',
];

export const parseCommandFromInputLine = (inputLine) => {
  let command = {
    isResolved: false,
    name:'',
    option1: '',
    option2: '',
  }
  let [nameCandidate, option1Candidate, option2Candidate] = inputLine.split(' ');

  command.isResolved = COMMANDS.includes(nameCandidate);

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
  'os': function(arg){os(arg)},
  'hash': function(){console.log('hsh tbd')},
  'up': function(){console.log('up tbd')},
  'cd': function(){console.log('cd tbd')},
  'ls': function(){console.log('ls tbd')},
  'cat': function(){console.log('cat tbd')},
  'add': function(){console.log('add tbd')},
  'rn': function(){console.log('rn tbd')},
  'cp': function(){console.log('cp tbd')},
  'mv': function(){console.log('mv tbd')},
  'rm': function(){console.log('rm tbd')},
  'compress': function(){console.log('zip tbd')},
  'decompress': function(){console.log('unzip tbd')},
};