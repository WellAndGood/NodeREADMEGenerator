// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// const {message} = require('statuses')

function validator(value) {
    if(value !== "") {
        return true 
    } else {
        return "Value needed to continue."
    }
}

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: 'What is your Github user name?',
        name: 'username',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What is your project\'s name?',
        name: 'projectname',
        // validate: validator
    },
    {
        type: 'input',
        message: 'Provide a short description of your project',
        name: 'description',
        // validate: validator
    },
    {
        type: 'list',
        message: 'What license will you be using?',
        name: 'license',
        choices: ['MIT','APACHE 2.0','GPL 3.0', 'BSD 3', 'Other']
        // validate: validator
    },
    {
        type: 'input',
        message: 'List your collaborators?',
        name: 'collaborators',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What is the default command to install dependencies?',
        name: 'dependencycommand',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What is the default command to run tests?',
        name: 'testscommand',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What does a reader need to know about using the repo?',
        name: 'usingrepo',
        // validate: validator
    },
    {
        type: 'input',
        message: 'What does a reader need to know about contributing to the repo?',
        name: 'contributingrepo',
        // validate: validator
    }
];

function matchingBadge(response) {
    if (response.license === "MIT") {
        response.badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    } else if (response.license === "APACHE 2.0") {
        response.badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
    } else if (response.license === "GPL 3.0") {
        response.badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
    } else if (response.license === "BSD 3") {
        response.badge = "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    } else {
        response.badge = "other/none"
    } 
}


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    
    matchingBadge(data)

    const readmeTemplate = `
# ${data.projectname}
## Author: ${data.username}

# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)

## Description
${data.description}

# Installation
Use the following command in your console to install dependencies:
<pre>${data.dependencycommand}</pre>

# Usage
Use the following command to run tests:
<pre>${data.testscommand}</pre>

**How to use the application**: ${data.usingrepo}
<br><br>
**How to contribute to the application**: ${data.contributingrepo}

## Contributors
${data.collaborators}

## License &nbsp; ${data.badge}
This project is licensed under:
${data.license}



# Contact
* GitHub account: ${data.username}
* E-Mail: ${data.email}
    `
    const filePath = "./README-Files/" + fileName

    fs.writeFile(filePath, readmeTemplate, (err) =>
    err ? console.error(err) : console.log('Success!')
    )
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((response) => {
        
        const filename = `${response.projectname.toLowerCase().split(' ').join('')}.md`
        writeToFile(filename, response)
    });
    

}

// Function call to initialize app
init();
