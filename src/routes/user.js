const express = require("express");
const router = express.Router();
const Users = require("../models/user");



router.get('/user', async (req,res) => { //localhost:8080/user
  console.log("req", req.body);
  const userEmail = req.body.email;
  try{
    const user = await Users.findOne({email:userEmail}).sort({_id:-1}); //latest inserted
    if(!user){
      return res.status(400).send("cannot find user");
    }
    return res.send(user);
  }catch(error){
    console.log(error);
    return res.status(400).send("cannot find user");
  }
  // try {
  // const users = await Users.find({email:req.body.email});
  // console.log("req", users);
  // res.send(users);
  // } catch (error) {
  //   console.log(error);
  //   res.status(400).send("cannot find user");
  // }
});

router.delete('/user', async (req,res) => { //localhost:8080/user
  console.log("req", req.body);
  const userId = req.body._id;
  try{
    const user = await Users.findByIdAndDelete(userId);
    res.send("User deleted");
  }catch(error){  
    console.log(error);
    res.status(400).send("cannot delete user");
  }
})

router.patch('/user/:userId', async (req,res) => { //localhost:8080/user
  const data = req.body;
  const userId = req.params?.userId;
  console.log("userId", userId);
  try{
    const user = await Users.findByIdAndUpdate(userId,data,{
      returnDocument: 'after',
      runValidators: true,
    });
    res.send(user);
  }catch(error){  
    console.log(error);

    res.status(400).send(error.message);
  }
})

module.exports = router;