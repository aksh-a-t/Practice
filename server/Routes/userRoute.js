const express = require('express');
const route = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");
const jwt = require('jsonwebtoken');

route.get('/get',(req,res)=>{
    console.log("hello");
    res.status(201).json("OK");
})

route.post('/register',async(req,res)=>{
    try{
        let {userName,email,contact,password} = req.body;
        if(!userName||!email||!contact||!password){
            return res.status(400).json({message:'Enter Valid Details'});
        }
        let maildb = await User.findOne({email});
        let namedb = await User.findOne({userName});
        if(maildb&&namedb){
            return res.status(401).json({message:'UserName and Email already exists'});
        }
        if(maildb){
            return res.status(401).json({message:"Email exists"});
        }
        if(namedb){
            return res.status(401).json({message:"UserName exists"});
        }

        let salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        const data = new User({userName,email,contact,password});
        await data.save();
        res.status(201).json({message:"Account Created"});
    }
    catch(error){
        console.log(error);
        res.sendStatus(400);
    }
});

route.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json("Enter Valid Credentials");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        let verify = await bcrypt.compare(password , user.password);
        if(!verify){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        // @ts-ignore
        const token = jwt.sign({_id:user._id,role:user.role},process.env.SECRET_ACCESS_KEY,{expiresIn:'6h'});
        return res.status(200).json({message:"successful",token,role:user.role});
          

    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
})



module.exports = route;