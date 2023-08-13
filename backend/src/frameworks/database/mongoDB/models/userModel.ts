import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },
    phoneNumber: {
      type: Number,
      maxlength: 10,
    },
    password: {
      type: String,
      trim: true,
    },
    role:{
      type: String,
      trim: true,
      default: 'normal'
    },
    GSTNumber:{
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

const User = model('User', userSchema);
export default User;

