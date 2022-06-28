const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    contact:{type:String,required:true},
    role:{type:String,default:"user"}
},
{timestamps:true}
);

const User = mongoose.model("User",UserSchema);
module.exports=User;
