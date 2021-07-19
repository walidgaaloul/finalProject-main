
const mongoose = require("mongoose");
// const validator = require("validator");

const ListingdateSchema = new mongoose.Schema({
    date_type: {
         type: String,
         enum : ['blocked', 'reserved'],
         default: 'blocked'
       },   
       date: {
         type: Date,
         default: Date.now,
        
      },
     
       listingId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Listing",
       },

});
module.exports = mongoose.model("ListingDate", ListingdateSchema);