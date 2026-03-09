const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/profile", async (req, res) => {
  try{
  const token = req.cookies?.token;
  const decoded = jwt.verify(token,"DEV@TINDER7778");
  console.log("request-----", req);
  res.send(decoded.email + " is logged in");
  }catch(error){
    console.log(error);
    return res.status(400).send(error.message);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("You are logged out");
});

module.exports = router;