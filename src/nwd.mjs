import path from "node:path";
import fs from "node:fs/promises";

function goUp() {
  const currentPath = process.cwd();
  const newPath = path.join(currentPath, "..");
  process.chdir(newPath);
}

function cd(newPath) {
  if (newPath === ".") {
    return;
  }
  else if (newPath === "..") {
    goUp();
  }
  else {
    process.chdir(newPath);
  }
}

async function ls() {
  const currentPath = process.cwd();
  const contents = await fs.readdir(currentPath);
  const directories = [];
  const files = [];
  await Promise.all(contents.map(async (c) => {
    const itemPath = path.join(currentPath, c);
    const itemStat = await fs.stat(itemPath);
    if (itemStat.isDirectory()) {
      directories.push(c);
    }
    if (itemStat.isFile()) {
      files.push(c);
    }
  }));
  const data = [];
  data.push({name: ".", type: ""});
  data.push({name: "..", type: ""});
  directories.forEach((d) => {
    data.push({name: d, type: "directory"});
  });
  files.forEach((f) => {
    data.push({ name: f, type: "file"});
  });
  console.table(data);
}

/**
 * Navigation and working directory
 */
const nwd = {
  goUp,
  cd,
  ls,
}

export default nwd;