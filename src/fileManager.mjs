import fs from "node:fs/promises"
import { Readable, Writable, Transform, Duplex } from "node:stream";
import { pipeline } from "node:stream/promises";


class FileManager {
  constructor(username) {
    this.username = username;
  }

  showGreetings (username) {
    message = `Welcome to the File Manager, ${username}`;
    console.log(message);
  }

  /**
   * handle user commands
   * @param {string} command 
   */
  commandHandler (command) {
    const c = command.trim();
    if (c.startsWith('cd ')) {
      return;
    }
    if (c.startsWith('cat ')) {
      return;
    }
    if (c.startsWith('add ')) {
      return;
    }
    if (c.startsWith('mkdir ')) {
      return;
    }
    if (c.startsWith('rn ')) {
      return;
    }
    if (c.startsWith('cp ')) {
      return;
    }
    if (c.startsWith('mv ')) {
      return;
    }
    if (c.startsWith('rm ')) {
      return;
    }
    if (c.startsWith('hash ')) {
      return;
    }
    if (c.startsWith('compress ')) {
      return;
    }
    if (c.startsWith('decompress')) {
      return;
    }
    switch(c) {
      case 'up': {
        break;
      }
      case 'ls': {
        break;
      }
      case '.exit': {
        console.log(`Thank you for using File Manager, ${this.username}`);
        break;
      }
      case 'ls': {
        break;
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
    }
  }
}


