
const mongoose = require("mongoose");
// const validator = require("validator");

const listingimageSchema = new mongoose.Schema({
  img_url: String,
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Listing",
  },

});
module.exports = mongoose.model("ListingImage", listingimageSchema);