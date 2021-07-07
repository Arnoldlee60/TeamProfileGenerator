const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

console.log("=== Prompt ===");

//create an array for your team 
//and then prompt for info then ask if there are more pople on the team 
const myTeam = [];

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the first and last name of your employee?',
        disName: function getName() {
            return this.name;
        },
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the employee id?',
        disId: function getId(){
            return this.id;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What the employee's email?",
        disEmail: function getEmail(){
            return this.email;
        }
      },
      {
        type: 'input',
        name: 'email',
        message: "What the employee's email?",
      },
    ]
    );
  };



  const promptUserAgain = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'another',
            message: "Is there another employee?",
            choices: ["Yes", "No"],
            again : function() {
                if(this.choices == "Yes")
                    {
                        //console.log("hi")
                      promptUser()
                    }
              }
        },
    )
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
  <p id="demo"></p>
  ${answers.name}
  </body>
  </html>`
  ;

  const init = () => {
    promptUser()
      .then((answers) => promptUserAgain())
      //.then((answers) => writeFileAsync('index.html', generateHTML(answers)))
      //.then(() => console.log('Successfully wrote to index.html')) //'Successfully wrote to index.html'
      //.catch((err) => console.error(err));
  };
  
  init();
  

 

