const express = require("express");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const dbConnect = require("./config/database");
const app = express();

const Users = require("./models/user");

dbConnect()
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });


app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("req", req.body);
  
  const user = new Users(req.body);
  try {
    await user.save();
    res.send("User created");

  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

app.get('/user', async (req,res) => { //localhost:8080/user
  console.log("req", req.body);
  const userEmail = req.body.email;
  try{
    const user = await Users.findOne({email:userEmail}).sort({_id:-1}); //latest inserted
    if(!user){
      res.status(400).send("cannot find user");
    }
    res.send(user);
  }catch(error){
    console.log(error);
    res.status(400).send("cannot find user");
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

app.delete('/user', async (req,res) => { //localhost:8080/user
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

app.patch('/user', async (req,res) => { //localhost:8080/user
  const data = req.body;
  const userId = data._id;
  try{
    const user = await Users.findByIdAndUpdate(userId,data,{
      returnDocument: 'after',
      runValidators: true,
    });
    console.log("user", user);
    res.send(user);
  }catch(error){  
    console.log(error);

    res.status(400).send(error.message);
  }
})
// // app.use('/test/12',(req, res) => {
// //     res.send('Hello new route!');
// // });
// // app.use('/test',(req, res) => {
// //     res.send('Hello TEst from DevTinder!');
// // });

// // app.use((req, res) => {
// //     res.send('Hello Home from DevTinder!');
// // });

// // app.get('/user',(req, res) => { //localhost:8080/user
// //     res.send({
// //         name: 'John',
// //         age: 30,
// //         city: 'New York'
// //     });
// // });

// // app.post('/user',(req, res) => { //localhost:8080/user
// //     res.send('User created!');
// // });

// // app.delete('/user',(req, res) => { //localhost:8080/user
// //     res.send('User deleted!');
// // });

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log(req.query);
//     next(); // pass to next handler
//   },
//   (req, res) => {
//     res.send("User updated 3!");
//   },
// );
// app.use("/admin", adminAuth);

// app.get("/getAllUsers", (req, res) => {
//   throw new Error("sdsdas");
//   // res.send('Hello users from DevTinder! You are authenticated');
// });

// app.get("/", (req, res) => {
//   throw new Error("sdsdas");

// });

// app.use("/", (err, req, res, next) => {
//   try {
//     throw err;
//   } catch (error) {
//     console.log("error");
//     res.status(500).send("Somthing went wrong error");
//   }
// });
