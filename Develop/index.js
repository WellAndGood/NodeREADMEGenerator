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
        choices: ['Public Domain','LGPL','Permissive', 'CopyLeft', 'Proprietary']
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

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    
    const readmeTemplate = `# ${data.projectname}
    ## By: ${data.username}
    
    * [Installation](#installation)
    * [Usage](#usage)
    * [Contributors](#contributors)
    * [License](#license)
    
    #Installation
    Use the following command in your console to install dependencies:
    <pre>${data.dependencycommand}</pre>

    #Usage
    Use the following command to run tests:
    <pre>${data.testscommand}</pre>

    Here's how to use the application: ${data.usingrepo}
    Here's how to contribute to the application: ${data.contributingrepo}

    ## Description
    ${data.description}

    ## Contributors
    ${data.collaborators}

    ## License
    This project is licensed under:
    ${data.license}

    # Contact
    * GitHub account: ${data.username}
    * E-Mail: ${data.email}
    `
    
    fs.writeFile(fileName, JSON.stringify(readmeTemplate, null, '\t'), (err) =>
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
