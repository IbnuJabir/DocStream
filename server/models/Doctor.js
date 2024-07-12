const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema
const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  docDepartment: {
    type: String,
    required: true,
  },
  avatar: {
    data: Buffer,
    contentType: String,
  },
});

// Create the model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
