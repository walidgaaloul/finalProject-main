
const mongoose = require("mongoose");
const hostSchema = new mongoose.Schema({
    BankName: { type: String},
    AccountTypes:{type: String,
        enum : ['CHECKING','SAVINGS'],},
    AccountNumber:{type:String},
    RoutingNumber:{type:String},

});
module.exports = mongoose.model("Host", hostSchema);