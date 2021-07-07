const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

console.log("=== Prompt ===");

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your employee?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee id?',
      },
      {
        type: 'input',
        name: 'email',
        message: "What the employee's email?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What the employee's email?",
      },
    ]);
  };

const generateHTML = (answers) =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    
  </body>
  </html>`;

  const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
      .then(() => console.log('Successfully wrote to index.html'))
      .catch((err) => console.error(err));
  };
  
  init();
