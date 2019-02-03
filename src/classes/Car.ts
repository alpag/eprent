
export class Car {
    id: String;
    make: String;
    model: String;
    color: String;
    production: String;
    photoUrl: String;
  
    constructor() {
        this.id = '';
        this.make = '';
        this.model = '';
        this.color = '';
        this.production = '';
        this.photoUrl = '';
    }

    setId(id){
        this.id = id;
    }
  }