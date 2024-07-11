const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSettingsSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pricing: { type: Map, of: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminSettings", AdminSettingsSchema);
