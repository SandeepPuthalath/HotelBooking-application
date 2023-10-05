"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../../../adapters/bookingController/bookingController"));
const BookingRepository_1 = __importDefault(require("../../../application/repositories/BookingRepository"));
const BookingRepositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/BookingRepositoryDb"));
const roomRepository_1 = __importDefault(require("../../../application/repositories/roomRepository"));
const roomsRepositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/roomsRepositoryDb"));
const paymentServices_1 = __importDefault(require("../../services/paymentServices"));
const paymentServiceInterface_1 = __importDefault(require("../../../application/services/paymentServiceInterface"));
const walletRepository_1 = __importDefault(require("../../../application/repositories/walletRepository"));
const walletRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/walletRepositoryDB"));
const transactionRepository_1 = __importDefault(require("../../../application/repositories/transactionRepository"));
const transactionRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/transactionRepositoryDB"));
const bookingRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, bookingController_1.default)(BookingRepository_1.default, BookingRepositoryDb_1.default, roomRepository_1.default, roomsRepositoryDb_1.default, paymentServiceInterface_1.default, paymentServices_1.default, walletRepository_1.default, walletRepositoryDB_1.default, transactionRepository_1.default, transactionRepositoryDB_1.default);
    router
        .route("/")
        .post(controller.handleBooking)
        .put(controller.handlePayment)
        .get(controller.handleFetchingBookingDetails)
        .patch(controller.handleStatsuChange);
    router.get("/:userId", controller.handleGetAllBookingsOfUser);
    router.route("/:bookingId").patch(controller.handleCancelBooking);
    router.route("/details/:id").get(controller.handleGetBookingDetailsOfUser);
    router.get("/owner/:hotelId", controller.handleGettingAllBookingOfHotel);
    router.get("/hotel/performance", controller.handleFetchingHotelPerformance);
    router
        .route("/chart/:hotelId")
        .get(controller.handleFetchingChartsDatas);
    return router;
};
exports.default = bookingRouter;
