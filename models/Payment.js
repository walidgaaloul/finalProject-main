
const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    PaymentAmount: { type: String},
    TimeStamp:{type:Date},
  

});
module.exports = mongoose.model("Payment", paymentSchema);