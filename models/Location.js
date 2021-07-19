
const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
    Country: { type: String},
    State:{type:String},
    City:{type:String},
    ZipCode:{type:String},

});
module.exports = mongoose.model("Location", locationSchema);