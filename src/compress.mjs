import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

async function compressFile(file, dest) {
  try {
    const readStream = createReadStream(file);
    const writeStream = createWriteStream(dest);
    await pipeline(
      readStream,
      zlib.createBrotliCompress(),
      writeStream,
    );
    return true;
  }
  catch(error) {
    return false;
  }
}

async function decompressFile(file, dest) {
  try {
    const readStream = createReadStream(file);
    const writeStream = createWriteStream(dest);
    await pipeline(
      readStream,
      zlib.createBrotliDecompress(),
      writeStream,
    );
    return true;
  }
  catch(error) {
    return false;
  }
}

const zip = {
  compressFile,
  decompressFile,
}

export default zip;
