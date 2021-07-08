const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, type, id, email, github) {
        super(name, type, id, email);
        this.github = github;
    }
    getGitHub(){
        return this.github;
    }
}

module.exports = Engineer; 