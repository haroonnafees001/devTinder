const mongoose = require("mongoose");
const url = "mongodb://namastedev:oinJJZ0p88llZ9VZ@ac-1nrwwaz-shard-00-00.nesrhfv.mongodb.net:27017,ac-1nrwwaz-shard-00-01.nesrhfv.mongodb.net:27017,ac-1nrwwaz-shard-00-02.nesrhfv.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-i0fkj8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=NamasteNode";

const dbConnect = async () => {
     await mongoose.connect(url); //await is used to make sure that the database is connected before the server starts
}



module.exports = dbConnect;