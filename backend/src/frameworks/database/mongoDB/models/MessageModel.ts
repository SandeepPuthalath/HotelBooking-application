import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    message:{
        type:String,
        require:true,
    },
    hotel:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"hotel"
    },
    user:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"User"
    },
    sender:{
        type: String,
        require: true,
    },
    sendTime:{
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
)

const Message = mongoose.model("message", MessageSchema);

export default Message;