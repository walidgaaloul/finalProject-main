
const mongoose = require("mongoose");
const hostearningSchema = new mongoose.Schema({
    EarningAmount: { type: String},
    

});
module.exports = mongoose.model("HostEarning", hostearningSchema);