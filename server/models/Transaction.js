const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  // paymentGateway: {
  //   type: String,
  //   enum: ["Chapa", "PayPal", "Stripe"],
  //   required: true,
  // },
email: {
    type: String,
    required: true
},
phone: {
    type: String,
    required: true
},
fname: {
    type: String,
    required: true
},
lname: {
    type: String,
    required: true
},
currency: {
    type: String,
    required: true
},
tx_ref: {
    type: String,
    required: true
},
amount: {
    type: Number,
    required: true
},
status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
}
},{
timestamps: true 
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
