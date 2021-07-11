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

const promptUserExtra = () => {
    if(myTeam[counter].type == "Manager")
    {
        //counter++;
    return inquirer.prompt([
        {
            type: "input",
            name: "phone",
            message: "What is the employee's office number?: ",
    }])
    }
    if(myTeam[counter].type == "Engineer")
    {
        //counter++;
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is the employee's github?: ",
    }])
    }
    if(myTeam[counter].type == "Intern")
    {
       // counter++;
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What is the employee's university?: ",
    }])
    }
}

function creation(name, type, id, email, answers) 
{
    if(myTeam[counter].type == "Manager")
    {
    const x = new Manager (name, type, id, email, answers.phone);
    myTeamFinished.push(x)
    //console.log(myTeamFinished)
    }
    if(myTeam[counter].type == "Engineer")
    {
    const x = new Engineer (name, type, id, email, answers.github);
    myTeamFinished.push(x)
    //console.log(myTeamFinished)
    }
    if(myTeam[counter].type == "Intern")
    {
    const x = new Intern (name, type, id, email, answers.school);
    myTeamFinished.push(x)
    //console.log(myTeamFinished)
    }
    console.log(myTeamFinished)
}

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
        //newPrompt(myTeam)
        initHTML();
    }
}

  const init = () => { //create add stuff into array
    promptUser()
      .then((answers) => myTeam.push(answers)) //maybe new function on its own?
      //.then((answers) => console.log(myTeam[counter].name))
      .then((answers) => promptUserExtra())
      .then((answers) => creation(myTeam[counter].name, myTeam[counter].type, myTeam[counter].id, myTeam[counter].email, answers))
      .then((answers) => promptUserAgain(answers))
  };
  
  init();

  const initHTML = () => {
   writeFileAsync('index.html', generateHTML(myTeamFinished))
      .then(() => console.log('Successfully wrote to index.html'))
      .catch((err) => console.error(err));
  };




//info is good all goes into myTeamFinished
//make a html file better all you really need is a title and some cards with info
//make card creation dynamic
//append child for loop for creating cards

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
  <div class="container">
  <div class="jumbotron">
    <h1 style="text-align: center;">Team Profile</h1>      
  </div>
  ` 
  + //add cards here
  
//cardGen;


  //+
  `
  ${cardElement()}
  </body>
  </html>
  `
  ;
//it might not be working because this var is prolly looking for object literal right away
//maybe have it work during generateHTML?


//}//${myTeamFinished[0].name}
const cardGenArr = []

function cardElement() {
  for(var i = 0; i < myTeamFinished.length; i++)
  {
  //var cardGen = //() =>{ it might not be working because this var is prolly looking for object literal right away
  //make if statements for different type of employee
  if(myTeamFinished[i].type == "Manager")
  {
    var cardGen =
  `
  <div class="card" style="width: 300px; float: left;">
  <div class="card-header">
  <h1>${myTeamFinished[i].name}</h1>
  <h1>${myTeamFinished[i].type}</h1>
  </div>
  <div class="card-body">
  <p><a class="card-text">ID: ${myTeamFinished[i].id}</a></p>
  <p><a href="${myTeamFinished[i].email}" class="card-text">Email: ${myTeamFinished[i].email}</a></p>
  <p><a class="card-text">Phone Number: ${myTeamFinished[i].phone}</a></p>
  </div>
  </div>  
  `
  }
    else if(myTeamFinished[i].type == "Engineer")
    {
      var cardGen =
      `
  <div class="card" style="width: 300px; float: left;">
  <div class="card-header">
  <h1>${myTeamFinished[i].name}</h1>
  <h1>${myTeamFinished[i].type}</h1>
  </div>
  <div class="card-body">
    <p><a class="card-text">ID: ${myTeamFinished[i].id}</a></p>
    <p><a href="${myTeamFinished[i].email}" class="card-text">Email: ${myTeamFinished[i].email}</a></p>
    <p><a href="https://github.com/${myTeamFinished[i].github}" class="card-text">Github: ${myTeamFinished[i].github}</a></p>
  </div>
  </div>  
  `
    }
      else{ //Intern
        var cardGen =
        `
  <div class="card" style="width: 200px; float: left;">
  <div class="card-header">
  <h1>${myTeamFinished[i].name}</h1>
  <h1>${myTeamFinished[i].type}</h1>
  </div>
  <div class="card-body">
  <p><a class="card-text">ID: ${myTeamFinished[i].id}</a></p>
  <p><a class="card-text">Email: ${myTeamFinished[i].email}</a></p>
  <p><a class="card-text">University: ${myTeamFinished[i].school}</a></p>
  </div>
  </div>  
  `
    }
  cardGenArr.push(cardGen)
  }
  var x = cardGenArr.join(' ')
  return x;
}

