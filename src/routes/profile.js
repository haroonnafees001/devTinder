const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const validateProfileEdit = require("../utils/validateProfileEdit");

router.get("/profile", async (req, res) => {
  try {
    const token = req.cookies?.token;
    const decoded = jwt.verify(token, "DEV@TINDER7778");
    console.log("request-----", req);
    res.send(decoded.email + " is logged in");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

router.post("/profile/edit", validateProfileEdit, async (req, res) => {
  try {

    console.log("body", req.body);
    const data = req.body;
    const token = req.cookies?.token;
    const decoded = jwt.verify(token, "DEV@TINDER7778");
    console.log("decoded======>>>>",decoded);
    

    const updatedUser = await Users.findOneAndUpdate({email:decoded?.email}, data, { 
      returnDocument: "after",
      runValidators: true,
    });
    res.send({
        message: "Profile updated",
        user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("You are logged out");
});

module.exports = router;
