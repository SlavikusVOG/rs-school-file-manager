import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";

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
      console.error(error);
      return false;
    }
  }
}

async function makeDir(directory) {
  try {
    await stat(directory);
    return false;
  }
  catch(error) {
    try {
      await mkdir(directory);
      console.log(`\nDirectory ${directory} is created`);
      return true;
    }
    catch(error) {
      console.error(error);
      return false
    }
  }
}

async function rn(file, newName) {
  try {
    const fileStat = await stat(file);
    if (fileStat.isFile()) {
      await rename(file, newName);
    }
    console.log(`\nFile ${file} is renamed to ${newName}\n`);
    return true
  }
  catch(error) {
    return false;
  }
}

async function cp(file, directory) {
  try {
    const readStream = createReadStream(file);
    const destination = path.join(directory, file);
    const writeStream = createWriteStream(destination);
    await pipeline(readStream, writeStream);
    console.log(`File ${file} copied`);
    return true;
  }
  catch(error) {
    return false;
  }
}

async function mv(file, directory) {
  try {
    const readStream = createReadStream(file);
    const destination = path.join(directory, file);
    const writeStream = createWriteStream(destination);
    await pipeline(readStream, writeStream);
    await rm(file);
    console.log(`\nFile ${file} moved to directory ${directory}`);
  }
  catch(error) {
    return false;
  }
}

async function removeFile(file) {
  try {
    await rm(file);
    console.log(`\nFile ${file} is deleted\n`)
    return true;
  }
  catch(error) {
    return false;
  }
}

const fileOperations = {
  cat,
  add,
  mkdir: makeDir,
  rn,
  cp,
  mv,
  rm: removeFile,
}

export default fileOperations;
