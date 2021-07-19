
const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"},
    FeedbackTitle:{type:String},
    FeedbackDescription:{type:String},
    Created_at:{
        type:Date,
        default:Date.now
    },

});
module.exports = mongoose.model("Feedback", feedbackSchema);