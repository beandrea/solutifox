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
]).then((answers) => {
    const fileName = `${answers.name}file.html`;
    const {name, local, linkedIn, github} = answers;
    
    fs.writeFile(fileName, writeFile(), (err) => 
        console.error(err));
    
    function writeFile(){
        return `<!DOCTYPE html>
        <html lang="en">
            <body>
                <div id="answers">
                    <h1>${answers.name}</h1>
                    <h2>${answers.local}</h2>
                    <h2><a href=${answers.linkedIn}>LinkedIn</h2>
                    <h2><a href=${answers.github}>Github</h2>
                </div>
            </body>
        </html>`;
    }
});