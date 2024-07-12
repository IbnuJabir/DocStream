const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema({
  // patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: Schema.Types.ObjectId },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  appointmentDate: { type: Date },
  meetingPlatform: {
    type: String,
    enum: ["Google Meet", "Zoom"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "booked", "completed", "expired", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  selectedDate: { type: Date, required: true },
  treatment: { type: String, required: true },
  tx_ref: {
    type: String,
    default: function () {
      return `tx-docstream12345-${Date.now()}`;
    },
  },
  message: { type: String },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
