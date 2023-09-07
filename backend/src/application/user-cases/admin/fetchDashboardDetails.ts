import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";



export default async function fetchDashboardDetails(userRepo: ReturnType<UserRepositoryMongoDB>,
    bookingRepo:ReturnType<BookingRepositoryDbType>,
    hotelRepo:ReturnType<hotelRepositoryDbInterface>,
    ){

    const data : any = {}

     data.totalUsers = await userRepo.countUsers();
     data.newUsers = await userRepo.fetchNewUsers()
     data.totalBookings = await bookingRepo.countBookings();
     data.totalRevenu = await bookingRepo.adminRevenu();
     data.totalHotels = await hotelRepo.countHotels();
     
     return data

}
