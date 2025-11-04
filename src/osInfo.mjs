import os from "node:os";

function printEndOfLine() {
  console.log(os.EOL);
}

function printCPUInfo() {
  const data = os.cpus();
  data.forEach((d) => {
    delete d.times;
  });
  console.log(`\nCPUS count: ${data.length}`);
  console.table(data)
}

function printHomeDirectory() {
  console.log(os.homedir());
}

function printUsername() {
  console.log(os.userInfo().username)
}

function printArchitecture() {
  console.log(os.arch());
}

const osInfo = {
  printArchitecture,
  printCPUInfo,
  printEndOfLine,
  printHomeDirectory,
  printUsername,
}

export default osInfo;
