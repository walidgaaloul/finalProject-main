
const mongoose = require("mongoose");
const facilitiesSchema = new mongoose.Schema({
    FacilityName: { type: String,
                    enum : ['yes','no']},
    

});
module.exports = mongoose.model("Facilities", facilitiesSchema);