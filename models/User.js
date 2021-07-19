
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Role:{type:String},
    FirstName: { type: String, required: true },
    LastName:{type:String},
    Email:{type:String},
    PassWord:{type:String},
    Photo:{type:String,
        default:
            'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg',},
    Birthday:{type:String},
    PhoneNumber:{type:String},
    Gender:{type: String,
        enum : ['male','female'],
        default: 'male'},
    AccountStatues:{type: String,
        enum : ['active','inactive'],
        default: 'active'},
    created_at : {type:Date, 
                  default: Date.now,}

});
userSchema.virtual("houses", {
    ref: "House",
    localField: "_id",
    foreignField: "host",
  });
module.exports = mongoose.model("User", userSchema);