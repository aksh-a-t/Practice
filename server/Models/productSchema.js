const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product:{type:String,required:true},
    price:{type:Number,required:true},
    discription:{type:String,required:true},
    status:{type:Boolean,default:false},
    categoryRef:{type:mongoose.Schema.Types.ObjectId,ref:"Category"}
},{timestamps:true})

const Product = mongoose.model("Product",productSchema);
module.exports=Product;