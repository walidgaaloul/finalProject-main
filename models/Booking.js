
const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Listing"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    guests: {
      type: Number,
    },
    adultsNum: {
      type: Number,
    },
    childrenNum: {
      type: Number,
    },
    infantsNum: {
      type: Number,
    },
    totalCost: {
      type: Number,
    },
    
  
  });
module.exports = mongoose.model("Booking", bookingSchema);