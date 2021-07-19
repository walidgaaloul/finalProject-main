
const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    
    CustomerRating:{type:String},
    CustomerComment:{type:String},
    HostRating:{type:String},
    HostComment:{type:String},


});
module.exports = mongoose.model("Rating", ratingSchema);