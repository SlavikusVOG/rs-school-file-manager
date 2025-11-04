import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

async function calcHash(file) {
  const hash = createHash("sha256");
  const readStream = createReadStream(file);
  await pipeline(readStream, hash);
  console.log(hash.digest("hex"));
}

export default {
  calcHash,
}
