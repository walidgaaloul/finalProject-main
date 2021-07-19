
const mongoose = require("mongoose");
// const validator = require("validator");

const listingsleepargmSchema = new mongoose.Schema({
    argm_type: {
         type: String,
         required:false
       },   
       number: {
         type: Number,
        required:false
      },
     
      listingId: {
         type: mongoose.Schema.Types.ObjectId,
         required: false,
         ref: "Listing",
       },

});
module.exports = mongoose.model("ListingSleepArgm", listingsleepargmSchema);