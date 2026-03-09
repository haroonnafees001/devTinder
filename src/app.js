const express = require("express");
const dbConnect = require("./config/database");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const app = express();
app.use(cookieParser());

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

app.use(authRoutes);
app.use(userRoutes);
app.use(profileRoutes);


