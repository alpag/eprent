
export class Customer {
    id: String;
    name: String;
    lastname: String;
    email: String;
    phone: String;
  
    constructor() {
        this.name = "";
        this.lastname = "";
        this.email = "";
        this.phone = "";
    }

    setId (id:String) {
        this.id = id;
    }
  }