const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, type, id, email, school) {
        super(name, type, id, email);
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern; 