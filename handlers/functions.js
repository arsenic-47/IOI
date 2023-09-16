const { readdirSync } = require("fs");
const client = require("..");
const { join } = require("path");
const functionFiles = readdirSync(join(client.dir, "/functions"))
client.functions = {}
for (const fileName of functionFiles) {
  if(!fileName.endsWith(".js") && fileName === "prototype") {
    const prototypeFolder = readdirSync(join(client.dir, "functions", fileName))
    for (let prototypeFunctionFiles of prototypeFolder) {
      require(join(client.dir, "functions", fileName, prototypeFunctionFiles))
    }
  }else{
  const data = require(join(client.dir, "functions", fileName))
  const functionName = fileName.split(".")[0]
  client.functions[functionName] = data
  }
}