'use strict'

import { getUserName } from "./common/parse-args.js";


const userName = getUserName(process.argv);
const WELCOME_MESSAGE = `Welcome to the File Manager, ${userName}!`;



console.log(WELCOME_MESSAGE);