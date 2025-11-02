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
  contents.forEach(async (c) => {
    const itemPath = path.join(currentPath, c);
    const itemStat = await fs.stat(itemPath);
    if (itemStat.isDirectory()) {
      directories.push(c);
    }
    if (itemStat.isFile()) {
      files.push(c);
    }
  });
  const data = [];
  let count = 1;
  data.push(["Index", "Name", "Type"]);
  data.push([count, ".", ""]);
  count++;
  data.push([count, "..", ""]);
  count++;
  directories.forEach((d) => {
    data.push([count, d, "directory"]);
    count++;
  });
  files.forEach((f) => {
    data.push([count, f, "file"]);
    count++;
  });
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