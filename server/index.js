const express = require('express');
const app = express();
const cors = require('cors');
const PORT=5000//||process.env.PORT;
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

dotenv.config({path:'./env/.env'});

app.use(express.json());
app.use(cors());
app.use('/api/user',require('./Routes/userRoute'));
app.use('/api/category',require("./Routes/categoryRoute"));
app.use('/api/product',require('./Routes/productRoute'));
// @ts-ignore
app.use('/api/bill',require('./Routes/billRoute'));

app.get("/api/check",async(req,res)=>{
  try{
    let token = req.headers['authorization']?.split(" ")[1];
    // @ts-ignore
    let verify = jwt.verify(token,process.env.SECRET_ACCESS_KEY);
    res.sendStatus(200);
  }
  catch(error){
    res.sendStatus(401);
  }

})
connection().catch(err => console.log(err));

async function connection() {
  // @ts-ignore
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("DataBase Connected..");
}

app.listen(PORT,()=>{
    console.log('Server Running...');
})