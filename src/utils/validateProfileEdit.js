const validateProfileEdit = (req,res,next) => {
    const allowedEdit = ["firstName", "lastName", "gender", "age", "skills"];
    const keys = Object.keys(req.body);
    console.log("keys", keys);
    console.log("allowedEdit", allowedEdit);
    const isAllowed = keys.every((key) => allowedEdit.includes(key));
    if(!isAllowed){
        return res.status(400).send("You are not allowed to edit this field");
    }
    next();

}

module.exports = validateProfileEdit;