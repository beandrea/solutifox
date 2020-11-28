const inquirer = require('inquirer');
const fs = require('fs');
const LicenseBadges = {
    None: "",
    Apache : "https://img.shields.io/badge/License-Apache%202.0-blue.svg",
    MIT: "https://img.shields.io/badge/License-MIT-yellow.svg",
    ISC: "https://img.shields.io/badge/License-ISC-blue.svg",
    IBM: "https://img.shields.io/badge/License-IPL%201.0-blue.svg"
};


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
        type: "input",
        name: "dependLst",
        message: "Please list in a single line any and all dependancies (or put None): "
    }, {
        type: "input",
        name: "contribLst",
        message: "Please list in a single line any and all contributor's github URLs (or put None): "
    }, {
        type: "input",
        name: "repo",
        message: "What is the working github repo URL for the project?"
    }, {
        type: "input",
        name: "site",
        message: "What is the site URL?"
    }, {
        type: "list",
        name: "contact",
        message: "How do you want to be contacted for any questions?",
        choices: ["Github", "Email"]
    }, {
        type: "input",
        name: "contactMeth",
        message: "Your chosen contact info: "
    }, {
        type: "input",
        name: "install",
        message: "How would a user install this project?"
    }, {
        type: "list",
        name: "license",
        message: "Does this project require any licenses, if so list them: ",
        choices: ["None", "MIT", "Apache", "IBM", "ISC"]
    }
]).then((answers) => {
    const fileName = `${answers.project}_README.md`;
    const { project, shortDescrip, dependLst, contribLst, repo, 
        site, contact, contactMeth, install, license} = answers;

    fs.writeFile(fileName, writeMD(), (err) =>
        console.error(err));

    function writeMD() {
        var file = dependLst === "None" || dependLst === "none" ? `# ${project}\n# Description: ${shortDescrip}\n` : 
            `# ${project}\n# Description: ${shortDescrip}\n# Dependancies: ${dependLst}\n`

        file += contribLst === "None" || contribLst === "none"? 
            `# Repo: ${repo}\n# URL: ${site}\n# Contact @ ${contact}: ${contactMeth}\n# Installation: ${install}\n` : 
            `# Contributors: ${contribLst}\n# Repo: ${repo}\n# URL: ${site}\n# Contact @ ${contact}: ${contactMeth}\n# Installation: ${install}\n`
                
        file += license !== "None" ? `# License: ${license}\n# Badge: ${LicenseBadges[license]}` : ""

        return file;
    }
});