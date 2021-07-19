const mongoose=require('mongoose')

const roleSchema=new mongoose.Schema({
    titre:{
        type:String,
        
    }
})

module.exports=mongoose.model('role',roleSchema);
