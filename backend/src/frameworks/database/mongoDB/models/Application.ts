import mongoose, { Schema, model } from 'mongoose';


const applicationSchema = new Schema(
  {
    applicantId: {
        type: mongoose.Types.ObjectId,
        trim: true,
        require: true
    },
    name: {
      type: String,
      trim: true
    },
    GSTNumber: {
        type: String,
        trim: true,
        require: true
    }
  },
  { timestamps: true }
);

const Application = model('application', applicationSchema);
export default Application;