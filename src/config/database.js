const mongoose = require("mongoose");
const url = "mongodb+srv://namastedev:oinJJZ0p88llZ9VZ@namastenode.nesrhfv.mongodb.net/devTinder";

const dbConnect = async () => {
     await mongoose.connect(url); //await is used to make sure that the database is connected before the server starts
}



module.exports = dbConnect;