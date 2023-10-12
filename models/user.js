import { Schema, model, models } from 'mongoose';

const chatLogSchema = new Schema({
  summaryName: {
    type: String,
    required: [true, 'Summary name is required!'],
  },
  logs: [
    {
      type: String, // 'user' or 'bot'
      message: String,
    },
  ],
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  chatLog: [chatLogSchema],
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;