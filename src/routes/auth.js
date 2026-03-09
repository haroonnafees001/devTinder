const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const Users = require("../models/user");
const validateSignup = require("../utils/validateSignup");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  console.log("req", req.body);

  
  const user = new Users(req.body);
  try {
    validateSignup(req);
   
    const hashedPassword = await bycrypt.hash(req.body.password, 10);
    console.log("hashedPassword", hashedPassword);
    user.password = hashedPassword;
    await user.save();
    res.send("User created");

  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});


router.post('/login', async (req, res) => {
  console.log("req", req.body);

  const {email,password} = req.body;
  try{
    const user = await Users.findOne({email});
    if(!user){
      return res.status(400).send("cannot find user");
    } 
    const isMatch = await bycrypt.compare(password,user.password);
    console.log("isMatch", isMatch);
    if(!isMatch){
      return res.status(400).send("Invalid credentials");
    }
    if(isMatch){
      const token = jwt.sign({email},"DEV@TINDER7778",{expiresIn:"1 day"});
    console.log("token", token);
    res.cookie('token', token, {maxAge: 1000 * 60 * 60 * 24});
    return res.send("Login successful, you will be logged in for 24 hours");
    }
  
  }catch(error){
    console.log(error);
    return res.status(400).send(error.message);
  }
}); 

module.exports = router;