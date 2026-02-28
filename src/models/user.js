const mongoose = require("mongoose");
const validator = require("validator");

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
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email must be valid");
            }
        },
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:1024,
        validate(value){
            if( !validator.isStrongPassword(value)){
                throw new Error("Password must be strong");
            }
        }
    },
    date:{
        type:Date,
        default:Date.now
    },
    gender:{
        type:String,
        required:false,
        validate(value) {
            if (value.toLocaleLowerCase() !== "male" && value.toLocaleLowerCase()  !== "female" && value.toLocaleLowerCase()  !== "other") {
                throw new Error("Gender must be Male, Female, or Other");
            }
        },
    },
    age:{
        type:Number,
        required:false
    },
    skills:{
        type:[String],
        required:false,
        validate(value) {
            if (value.length < 3 || value.length > 10) {
                throw new Error("At least 3 and at most 10 skills are required");
            }
        },
    }
},
{
    timestamps: true,
})

module.exports= mongoose.model("User",userScheme);