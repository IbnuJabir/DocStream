const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
