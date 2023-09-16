const { readdirSync } = require("fs");
const client = require("..");
const { join } = require("path");

const eventFiles = readdirSync(join(client.dir, "events"))
for (let eventFile of eventFiles) {
    require(join(client.dir, "events", eventFile))
}