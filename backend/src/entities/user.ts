export default function userEntity(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
) {
  return {
   getFirstName: () : string => firstName,
   getLastName : () : string => lastName,
   getEmail : (): string => email,
   getPhoneNumber: () :  number => parseInt(phoneNumber),
   getPassword: () : string => password
  };
}


export type UserEntityType =  ReturnType<typeof userEntity>