const fs = require("fs");
const yargs = require("yargs");const loadTasks = () => {
try {
const dataBuffer = fs.readFileSync("tasks.json");
const dataJSON = dataBuffer.toString();
return JSON.parse(dataJSON);
} catch (error) {
return [];
}
};const saveTasks = tasks => {
const dataJSON = JSON.stringify(tasks);
fs.writeFileSync("tasks.json", dataJSON);
};yargs.command("add", "Add a new task", {
task: {
describe: "Task description",
demandOption: true,
type: "string"
}
}, argv => {
const tasks = loadTasks();
tasks.push({ task: argv.task });
saveTasks(tasks);
console.log(`Task added: ${argv.task}`);
});yargs.command("list", "List all tasks", {}, () => {
const tasks = loadTasks();
tasks.forEach(task => {
console.log(task.task);
});
});yargs.command("delete", "Delete a task", {
task: {
describe: "Task description",
demandOption: true,
type: "string"
}
}, argv => {
const tasks = loadTasks();
const remainingTasks = tasks.filter(task => task.task !== argv.task);
saveTasks(remainingTasks);
console.log(`Task deleted: ${argv.task}`);
});yargs.parse();
