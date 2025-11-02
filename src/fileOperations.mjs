import { createReadStream } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

// TODO: fix this

async function cat(filePath) {
  console.log(`\nThe content of file "${filePath}":\n`);
  try {
    const readStream = createReadStream(filePath);
    // TODO: find out why this does not work
    // const writeStream = process.stdout;
    const writeStream = new Writable({
      write: (chunk, encofing, callback) => {
        process.stdout.write(chunk);
        callback();
      }
    })
    await pipeline(
      readStream,
      writeStream
    );
    console.log("\nFinished");
  }
  catch(error) {
    console.log("\nFinished");
  }
}

async function add(fileName) {
  try {
    await stat(fileName);
    return false;
  }
  catch(error) {
    try {
      await writeFile(fileName, "");
      console.log(`\nFile ${fileName} is created`);
      return true;
    }
    catch(error) {
      return false;
      console.error(error);
    }
  }
}

async function mkdir() {
  // TODO: implement
}

async function rn() {
  // TODO: implement
}

async function cp() {
  // TODO: implement
}

async function mv() {
  // TODO: implement
}

async function rm() {
  // TODO: implement
}

const fileOperations = {
  cat,
  add,
  mkdir,
  rn,
  cp,
  mv,
  rm,
}

export default fileOperations;
