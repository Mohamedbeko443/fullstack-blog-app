const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateRegisterUser } = require("../models/User");



/**
 * @desc Register new user
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 */
const registerUser = asyncHandler( async (req , res)=>{
    // validation 
    const { error } = validateRegisterUser(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message})
    }
    // check is user already exits
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({message: "user already exists."});
    }
        
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);

    // new user and save it to Db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    await user.save();

    return res.status(201).json({message: "you've been registered successfully, please login."});

    // send response to client
})



module.exports = {
    registerUser,
}