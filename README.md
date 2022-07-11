# file-manager
RSS Node.js 2022 Q2 task#02 

**description**:
file-manaager is a simple CLI tool for basic file manipulations - copy/move/delete.. etc.

**usage**:
to run the tool in npm environment enter:
`npm run start -- --username=<your_name_here>`
if user name will be omitted or will not be resolved - system current username / default name will be used.

to exit the tool type `.exit` or press `Ctrl-C`

List of available operations and their syntax:
- Navigation & working directory (nwd)
    - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)  
    `up`

    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    `cd path_to_directory`

    - List all files and folder in current directory and print it to console
    `ls`

- Basic operations with files
    - Read file and print it's content in console:
    `cat path_to_file`

    - Create empty file in current working directory:

    `add new_file_name`

    - Rename file:
    `rn path_to_file new_filename`

    - Copy file: 
    `cp path_to_file path_to_new_directory`

    - Move file (same as copy but initial file is deleted): 
    `mv path_to_file path_to_new_directory`

    - Delete file: 
    `rm path_to_file`

- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line)  
    `os --EOL`

    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
    `os --cpus`

    - Get home directory: 
    `os --homedir`

    - Get current *system user name* (Do not confuse with the username that is set when the application starts)  
    `os --username`

    - Get CPU architecture for which Node.js binary has compiled  
    `os --architecture`

- Hash calculation  
    - Calculate hash for file and print it into console  
    `hash path_to_file`

- Compress and decompress operations  
    - Compress file (using Brotli algorithm)  
    `compress path_to_file path_to_destination`

    - Decompress file (using Brotli algorithm)  
    `decompress path_to_file path_to_destination`





### RSS nodejs 2022 Q2 task#02

1. task link : [https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)
2. deploy link(repo): [https://github.com/madkorney/file-manager](https://github.com/madkorney/file-manager)
3. **notes:**
  - read file for hash calc is implemented via fs.readFile, not via stream. 
  - if no user name is provided or it cant be parsed correctly - default name will be used (which is OS username)
  - cd \ change active path to the root of the drive where project was launched. so if it differs from the drive with homedir
  - CPU speed shown in MHz not GHz - fixed
