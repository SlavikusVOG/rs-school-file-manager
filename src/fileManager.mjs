import fs from "node:fs/promises"
import { Readable, Writable, Transform, Duplex } from "node:stream";
import { pipeline } from "node:stream/promises";
import os from "os";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import nwd from "./nwd.mjs";

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
    const message = `You are currently in ${currentDirectory}`;
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
      const answer = await rl.question('Enter the command: ');
      finishFlag = await this.handleCommand(answer);
      this.showCurrentWorkingDirectory();
    }
    while (!finishFlag);
  }

  showInvalidInputMessage() {
    console.log("Invalid input");
  }

  showErrorMessage() {
    console.error("Operation failed");
  }

  /**
   * handle user commands
   * @param {string} command
   * @returns {boolean} shows whether the command was executed successfully
   */
  async handleCommand (command) {
    const c = command.trim();
    if (c.startsWith('cd ')) {
      if (c.split(" ").length > 2) {
        this.showErrorMessage();
        return false;
      }
      const path = c.split(" ")[1];
      nwd.cd(path);
      return false;
    }
    if (c.startsWith('cat ')) {
      return false;
    }
    if (c.startsWith('add ')) {
      return false;
    }
    if (c.startsWith('mkdir ')) {
      return false;
    }
    if (c.startsWith('rn ')) {
      return false;
    }
    if (c.startsWith('cp ')) {
      return false;
    }
    if (c.startsWith('mv ')) {
      return false;
    }
    if (c.startsWith('rm ')) {
      return false;
    }
    if (c.startsWith('hash ')) {
      return false;
    }
    if (c.startsWith('compress ')) {
      return false;
    }
    if (c.startsWith('decompress')) {
      return false;
    }
    switch(c) {
      case 'up': {
        nwd.goUp();
        break;
      }
      case 'ls': {
        await nwd.ls();
        break;
      }
      case '.exit': {
        console.log(`Thank you for using File Manager, ${this.username}`);
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
}
