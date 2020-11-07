const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What name do you go by?"
  }, {
    type: "input",
    name: "local",
    message: "Where are you from?"
  }, {
    type: "input",
    name: "linkedIn",
    message: "What is your LinkedIn URL?"
  }, {
    type: "input",
    name: "github",
    message: "What is your Github URL?"
  }
]).then(answers => {
  fs.writeFileSync('log.txt', `${JSON.stringify(answers)} \n`);
});