const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:50
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:1024
    },
    date:{
        type:Date,
        default:Date.now
    },
    gender:{
        type:String,
        require:false
    },
    age:{
        type:Number,
        require:false
    }
})

module.exports= mongoose.model("User",userScheme);