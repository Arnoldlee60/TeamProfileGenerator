const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, type, id, email, officeNumber) {
        super(name, type, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager; 