const express=require("express")
const User=require("../models/user")
const router=express.Router();
const jwt = require("jsonwebtoken") 

const sendToken=(user,statusCode,res)=>{
    
    const token=user.getJwtToken();
    console.log("done")
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true,
        sameSite: "none",
        secure: true,
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
}

router.post("/create-user", async(req, res) => {
    try{
        const {username,email,password}=req.body;
        const useremail=await User.findOne({email})
        if(useremail){
            res.status(500).json({message:"user already exists"});
        }
        const user = new User({
            username:username,
            email:email,
            password:password,
            isAdmin: false
        })
        
        await user.save();
        console.log("user created");
        console.log(user)
        sendToken(user, 200, res);
    }catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"});
    }
});




  router.post(
    "/login-user",
    async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log(email)
        if (!email || !password) {
            res.status(400).json({message:"please provide all fields"});
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          res.status(400).json({message:"user not found"});
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            res.status(400).json({message:"invalid email or password"})
          );
        }
  
        sendToken(user, 201, res);
      } catch (error) {
        res.status(500).json({message:"something went wrong"});
      }
    });


  
  router.get("/logout", async(req,res)=>{
    
    try{
      console.log("logout")
      res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
      })
      res.status(201).json({
        success:true,
        message:"logout successful"
      })
    }catch(err){
        res.status(500).json({message:"something went wrong"});
    }
  })
module.exports=router