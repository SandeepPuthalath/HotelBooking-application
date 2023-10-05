"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function messageRepository(repository) {
    const getMessages = async (hotelId) => await repository.getMessages(hotelId);
    const addMessage = async (user, hotel, message, sender) => await repository.addMessage(user, hotel, message, sender);
    return {
        addMessage,
        getMessages,
    };
}
exports.default = messageRepository;
