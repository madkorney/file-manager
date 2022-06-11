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
  }


  return command;
}

export const runCommand = (command) => {
  command.name(command.option1, command.option2);
}