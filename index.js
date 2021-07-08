const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Manager = require("./people/Manager");
const Engineer = require("./people/Engineer");
const Intern = require("./people/Intern");
var counter = 0;
// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

console.log("=== Prompt ===");

//create an array for your team 
//and then prompt for info then ask if there are more pople on the team 
const myTeam = [];
const myTeamFinished = [];

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
        type: 'list', //type of employee
        name: 'type',
        message: "What is your employee?",
        choices: ["Manager","Engineer", "Intern"],
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
        type: 'list',
        name: 'another',
        message: "Is there another employee?",
        choices: ["Yes", "No"],
    },
    ]
    );
  };

function promptUserAgain(){
    var i;
    for(i = 0; i < myTeam.length; i++ ) //checking if properly pushed
    {
    //console.log("number " + i + " name " + myTeam[i].name + " ")
    //promptUser()
    }
    
    //if yes then prompt for more employees
    if(myTeam[counter].another == "Yes"){
        counter++;
        init();
    }
    else{ //no for generate html with information
        newPrompt(myTeam)
    }
}

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

  const init = () => { //create add stuff into array
    promptUser()
      .then((answers) => myTeam.push(answers))
      //.then(() => newPrompt(myTeam))
      .then((answers) => promptUserAgain(answers))
  };
  
  init();
  
//maybe create objects?
//create new prompt based on when promptuseragain is no (the else statement)
//use the myTeam array and choose the myTeam.type and then use the oject.prototype 
//thing and put in new information
//make a html file better all you really need is a title and some cards with info


function newPrompt(myTeam){
    var i;
    for(i = 0; i < myTeam.length; i++)
    {
        //console.log(myTeam[i].name) + " ";
        if(myTeam[i].type == "Manager") //maybe prompt here?
        {
            //prompt here  something = prompt
            //then use const x = new Manager(name, type, id, email, officeNumber) examlple
            var add = inquirer.prompt([{
                type: "input",
                name: "phone",
                message: "What is " + myTeam[i].name + " office number?: ",
                validate: function validateName(name){
                    return name !== "";
                },
            }, ]);

            const x = new Manager (myTeam[i].name, myTeam[i].type, myTeam[i].id, myTeam[i].email, add)
            myTeamFinished.push(x)
            console.log(myTeamFinished)
        }
        if(myTeam[i].type == "Engineer")
        {
            console.log(myTeamFinished)
        }
        if(myTeam[i].type == "Intern")
        {
            
        }
    }
}

//use const x = new Manger
