
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
    PaymentTypes:{type: String,
        enum : ['cheque','cart'],
        default: 'cheque'},
    CardNumber:{type:String},
    SecurityCode:{type:String},
    NameOnCard:{type:String},

});
module.exports = mongoose.model("Customer", customerSchema);