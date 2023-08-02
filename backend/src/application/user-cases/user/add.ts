// import user from '../../../entities/user';

// export default function addUser(
//   username:string ,
//   password:string,
//   email:string,
//   role:string,
//   createdAt:Date,
//   userRepository:any,
//   authService:any
// ) {
//   // TODO: add a proper validation (consider using @hapi/joi)
//   if (!username || !password || !email) {
//     throw new Error('username, password and email fields cannot be empty');
//   }

//   const newUser = user(
//     username,
//     authService.encryptPassword(password),
//     email,
//     role,
//     createdAt
//   );

//   return userRepository
//     .findByProperty({ username })
//     .then((userWithUsername:any) => {
//       if (userWithUsername.length) {
//         throw new Error(`User with username: ${username} already exists`);
//       }
//       return userRepository.findByProperty({ email });
//     })
//     .then((userWithEmail:any) => {
//       if (userWithEmail.length) {
//         throw new Error(`User with email: ${email} already exists`);
//       }
//       return userRepository.add(newUser);
//     });
// }
