export class Patient {
    constructor({id = 0,dni = '', firstName = "", lastName = "", email = "", homeAddress = "", birthday = ""}) {
        this.id = id;
        this.dni = dni;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.homeAddress = homeAddress;
        this.birthday = birthday;
    }
}