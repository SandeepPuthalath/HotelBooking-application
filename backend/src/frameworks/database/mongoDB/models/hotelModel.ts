import mongoose, { Schema, model } from 'mongoose';


const hotelSchema = new Schema(
  {
    name: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    distance:{
        type: String, 
        require: true
    },
    photos:{
        type: [String], 
    },
    desc:{
        type: String, 
        require: true
    },
    rating:{
        type: Number,
        require: true,
        default: 0,
        min:0,
        max: 5
    },
    rooms:{
        type: [String]
    },
    cheapestPrice:{
        type:Number,
        require: true
    },
    featured:{
        type: Boolean,
        default:false
    },
    userId:{
        type: String,
        require: true,
    }
  },
  { timestamps: true }
);

const Hotel = model('Hotel', hotelSchema);
export default Hotel;