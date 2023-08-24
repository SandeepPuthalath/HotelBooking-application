import mongoose from "mongoose";


const bannerSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true,
    },
    desc: {
        type: String,
        require: true,
        trim: true
    },
    cloudinaryImgUrl: {
        type: String,
        require: true,
        trim: true,
    }
})


const Banner = mongoose.model("banner", bannerSchema);

export default Banner