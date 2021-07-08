class Employee {
    constructor(name, type, id, email) {
        this.name = name;
        this.type = type;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
}


module.exports = Employee;