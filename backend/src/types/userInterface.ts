export interface CreateUserInterface {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    password: string;
    // confirmationString: string;
    // confirmed: Boolean;
  }
  
  export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  