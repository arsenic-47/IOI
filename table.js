module.exports = async (client) => {
const { table } = require('table');
const chalk = (await import('chalk')).default
const data = [
 [chalk.grey("Name"), chalk.grey("Category"), chalk.grey("Description"), chalk.grey("Usage")]
];
for (const command of client.commands) {
    data.push([
    command[0],
    command[1].category,
    command[1].description ? chalk.green(command[1].description) : chalk.yellow("[MISSING_DESCRIPTION]") , 
    command[1].usage ? chalk.green(command[1].usage) : chalk.yellow("[MISSING_USAGE]")])
}
const config = {
    header: {
    alignment: 'center',
    content: chalk.bold(chalk.white('COMMANDS')),
    }
}
console.log(table(data, config));
}