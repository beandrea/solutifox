const inquirer = require('inquirer');
const fs = require('fs');
const { resolve } = require('path');

inquirer.prompt([
    {
        type: "input",
        name: "project",
        message: "What is the name of your project?"
    }, {
        type: "input",
        name: "shortDescrip",
        message: "A short description of the project: "
    }, {
        type: "list",
        name: "dependancy",
        message: "Was this project created using any dependancies?",
        choices: ["Yes", "No"]
    }
]).then((answers) => {
    await depend(answers);

    inquirer.prompt([
        {
            type: "list",
            name: "contributors",
            message: "Did this project have any contributors?",
            choices: ["Yes", "No"]
        }
    ]).then((answers) => {
        await contribute(answers);

        inquirer.prompt([
            {
                type: "input",
                name: "repo",
                message: "What is the working github repo URL for the project?"
            }, {
                type: "input",
                name: "site",
                message: "What is the site URL?"
            }
        ]).then((answers) => {
            const fileName = `${answers.project}_README.md`;
            const { project, shortDescrip, dependancy, dependLst, contributors,
                contribLst, repo, site } = answers;

            fs.writeFile(fileName, writeMD(), (err) =>
                console.error(err));

            function writeMD() {
                const file = dependancy === "Yes" ? `#${project}
                #${shortDescrip}
                #Dependancies: ${dependLst}` : `#${project} 
                #${shortDescrip}`

                file += contributors === "Yes" ? `#Contributors: ${contribLst}
                #Repo: ${repo}
                #URL: ${site}` : `#Repo: ${repo}
                #URL: ${site}`

                return file;
            }
        });
    });
});

async function depend(answers) {
    if (answers.dependancy === "Yes") {
        inquirer.prompt([
            {
                type: "input",
                name: "dependLst",
                message: "Please list in a single line any and all dependancies: "
            }
        ]).then((answer) => {
            return new Promise(resolve => {
                answer
            });
        });
    }
    return new Promise(resolve => {});
}

async function contribute(answers) {
    if (answers.contributors === "Yes") {
        inquirer.prompt([
            {
                type: "input",
                name: "contribLst",
                message: "Please list in a single line any and all contributor's github URLs: "
            }
        ]).then((answer) => {
            return new Promise(resolve => {
                answer
            });
        });
    }
    return new Promise(resolve => {});
}