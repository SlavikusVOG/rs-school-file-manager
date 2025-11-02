import fs from "node:fs/promises"
import { Readable, Writable, Transform, Duplex } from "node:stream";
import { pipeline } from "node:stream/promises";
import os from "os";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import nwd from "./nwd.mjs";
import fileOperations from "./fileOperations.mjs";

class FileManager {
  constructor(username) {
    this.username = username;
    const workingDirectory = os.homedir();
    process.chdir(workingDirectory);
  }

  showGreetings () {
    const message = `Welcome to the File Manager, ${this.username}`;
    console.log(message);
  }

  showFarewell () {
    const message = `Thank you for using File Manager, ${this.username}, goodbye!`;
    console.log(message);
    
  }

  showCurrentWorkingDirectory() {
    const currentDirectory = process.cwd();
    const message = `\nYou are currently in ${currentDirectory}`;
    console.log(message);
  }

  async takeCommandsLoop() {
    this.showCurrentWorkingDirectory();
    const rl = readline.createInterface({
      input,
      output,
    });
    let finishFlag;
    do {
      try {
        const answer = await rl.question('\nEnter the command: ');
        finishFlag = await this.handleCommand(answer);
      }
      catch(error) {
        if (error.code === "ABORT_ERR") {
          console.log("\n")
          finishFlag = true;
        }
        else {
          this.showOperationFailedMessage();
        }
      }
      finally {
        this.showCurrentWorkingDirectory();
      }
    }
    while (!finishFlag);
  }

  showInvalidInputMessage() {
    console.log("Invalid input");
  }

  showOperationFailedMessage() {
    console.error("Operation failed");
  }

  /**
   * handle user commands
   * @param {string} commandString
   * @returns {boolean} shows whether the command was executed successfully
   */
  async handleCommand (commandString) {
    const command = commandString.trim().split(" ")[0];
    const args = commandString.trim().split(" ")
    args.shift();
    switch(command) {
      case 'cd': {
        if (args.length === 1) {
          nwd.cd(args[0]);
        }
        else {
          this.showOperationFailedMessage();
        }
        break;
      }
      case 'cat': {
        if (args.length === 1) {
          await fileOperations.cat(args[0]);
        }
        else {
          this.showOperationFailedMessage();
        }
        break;
      }
      case 'add': {
        if (args.length === 1) {
          const result = await fileOperations.add(args[0]);
          if (result === false) {
            this.showOperationFailedMessage();
          }
        }
        else {
          this.showOperationFailedMessage();
        }
        break;
      }
      case 'mkdir': {
        if (args.length === 1) {
          const result = await fileOperations.mkdir(args[0]);
          if (result === false) {
            this.showOperationFailedMessage();
          }
        }
        else {
          this.showOperationFailedMessage();
        }
        break;
      }
      case 'rn': {
        if (args.length === 2) {
          const result = await fileOperations.rn(args[0], args[1]);
          if (result === false) {
            this.showOperationFailedMessage();
          }
        }
        else {
          this.showOperationFailedMessage();
        }
        break;
      }
      case 'cp': {
        break;
      }
      case 'mv': {
        break;
      }
      case 'rm': {
        break;
      }
      case 'hash': {
        break;
      }
      case 'compress': {
        break;
      }
      case 'decompress': {
        break;
      }
      case 'up': {
        nwd.goUp();
        break;
      }
      case 'ls': {
        await nwd.ls();
        break;
      }
      case '.exit': {
        return true;
      }
      case 'os --EOL': {
        break;
      }
      case 'os --cpus': {
        break;
      }
      case 'os-homedir': {
        break;
      }
      case 'os --username': {
        break;
      }
      case 'os --architecture': {
        break;
      }
      default: {

      }
    }
    return false;
  }
}

const argument = process.argv.slice(2)[0];
if (argument.startsWith('--username')) {
  const username = argument.split('=')[1];
  const fileManager = new FileManager(username);
  fileManager.showGreetings();
  await fileManager.takeCommandsLoop();
  fileManager.showFarewell();
  let timer = 2;
  console.log(`${timer+1}...`);
  const timerId = setInterval(() => {
    console.log(`${timer}...`);
    if (timer === 1) {
      clearInterval(timerId);
    }
    timer--;
  }, 1000);
  setTimeout(() => {
    process.exit(0);
  },3000);
}
