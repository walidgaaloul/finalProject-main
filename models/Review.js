
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Listing",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Booking",
      },
     
        body: {
          type: String,
        },
        ratings: {
          type: String,
          
        },
      
        review_date:{type:Date,
        default: Date.now,
    },
   

});
module.exports = mongoose.model("Review", reviewSchema);