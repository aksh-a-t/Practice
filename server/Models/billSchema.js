const mongoose  = require("mongoose");

const billSchema = new mongoose.Schema({
    customerName:{type:String,required:true},
    contact:{type:Number},
    productDetails:[
        {
            product:{type:String,required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true},
            total:{type:Number,required:true}
        }
    ],
    totalAmount:{type:Number}
})

const Bill = mongoose.model("Bill",billSchema);
module.exports=Bill;