
const mongoose = require("mongoose");
const earningcampanySchema = new mongoose.Schema({
    EarningAmount: { type: String},
  
});
module.exports = mongoose.model("EarningCampany", earningcampanySchema);