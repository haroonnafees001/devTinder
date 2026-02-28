const validator = require("validator");

const validateSignup = (req) => {
    const {firstName,lastName,email,password } = req.body;
        if(!firstName){
            throw new Error("First name is required");
        }
        if(!lastName){
            throw new Error("Last name is required");
        }
        if(!email){
            throw new Error("Email is required");
        }
        if(!validator.isEmail(email)){
            throw new Error("Email must be valid");
        }
        if(!password){
            throw new Error("Password is required");
        }
        if(!validator.isStrongPassword(password)){
            throw new Error("Password must be strong");
        }
       
}

module.exports = validateSignup;