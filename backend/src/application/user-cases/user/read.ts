import { ObjectId } from "mongoose";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface} from "../../repositories/userDbRepository";
// import { CreateUserInterface } from "../../../types/userInterface";



export  function removePasswordField(object: any){
    let { _id, firstName, lastName, email, phoneNumber, role, GSTNumber, createdAt, updatedAt} = object

    createdAt = new Date(createdAt).toLocaleString().split(",")[0];

    updatedAt = new Date(updatedAt).toLocaleString().split(",")[0]

    return { _id, firstName, lastName, email, phoneNumber, role, GSTNumber, createdAt, updatedAt}

}


export const getUserProfile = async ( id: string, userRepository : ReturnType<UserDbInterface>) =>{


    if(!id){
        throw new AppError('Somthing went wrong please log in again', HttpStatus.UNAUTHORIZED)
    }
    const user  = await userRepository.getUserById(id);
    const data = removePasswordField(user)

    if(!user){
        throw new AppError('User Dose not exist', HttpStatus.UNAUTHORIZED)
    }

    return data
}


export const getAllUsers =async ( userRepository : ReturnType<UserDbInterface>) => {
    const users = await userRepository.getAllUsers()

    const data =  users.map( user => removePasswordField(user))

    console.log(data)

    return data
}


