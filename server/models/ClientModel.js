const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

ClientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const ClientModel = mongoose.model("client", ClientSchema);

module.exports = ClientModel;
