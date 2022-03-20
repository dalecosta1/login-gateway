const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirthday: Date,
    sex: String,
    country: String,
    city: String,
    address: String,
    postCode: String,
    phonePrefix: String,
    phoneNumber: Number,
    createdAt: Date,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  }, 
  { 
    versionKey: false
  })
);

module.exports = User;
