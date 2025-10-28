const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateRegisterUser, validateLoginUser } = require("../models/User");



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


/**
 * @desc    Login user
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 */
const loginUser = asyncHandler(async (req ,res) => {
    // validate credentials
    const { error } = validateLoginUser(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }
    // check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(400).json({message: "invalid email or password."});
    }
    // check the password
    const matchedPassword = await bcrypt.compare(req.body.password , user.password);
    if(!matchedPassword)
    {
        return res.status(400).json({message: "invalid email or password"});
    }

    

    // generate token
    const token = user.generateAuthToken();
    return res.status(200).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
        username: user.username
    })
});

//todo sending activation email 

module.exports = {
    registerUser,
    loginUser
}