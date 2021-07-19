
const mongoose = require("mongoose");
const refundSchema = new mongoose.Schema({
    RefundDate: { type: Date},
 

});
module.exports = mongoose.model("Refund", refundSchema);