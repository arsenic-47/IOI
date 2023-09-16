const { join } = require("path");
const client = require("..");
const { readdirSync } = require("fs");
const Categories = readdirSync("./commands")
 for (const category of Categories) {
  readdirSync(join(client.dir, 'commands', category)).forEach(commandFileName => {
    if(!commandFileName.includes('.js')) return;
    const data = require(join(client.dir, 'commands', category, commandFileName))
    data.category = category
    client.commands.set(commandFileName.split(".")[0], data)
  })
}