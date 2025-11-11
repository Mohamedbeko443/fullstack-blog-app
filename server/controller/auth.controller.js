const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateRegisterUser, validateLoginUser } = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


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


    // create verification token and save to db
    const verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
    });
    await verificationToken.save();

    // make link
    const link = `${process.env.CLINT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`
    // attach the link into an html template
    const template = `
        <div>
            <p> Click on the link below to verify your email </p>
            <a href="${link}"> Verify</a>
        </div>
    `
    // send email to user
    await sendEmail(user.email, "Verify Your Email" , template);
    // send response to client
    return res.status(201).json({message: "We sent to you an email, please verify your email address."});
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

    if(!user.isAccountVerified)
    {

        return res.status(400).json({message: "please verify your account to login "});
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



/**
 * @desc    verify user account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 */
const verifyUserAccount = asyncHandler(async (req , res) => {
    const user = await User.findById(req.params.userId);
    if(!user)
    {
        return res.status(400).json({message: "invalid link."});
    }

    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token
    });

    if(!verificationToken)
    {
        return res.status(400).json({message: "invalid link"});
    }

    user.isAccountVerified = true;
    await user.save();

    await verificationToken.deleteOne();
    return res.status(200).json({message: "your account verified"})

})



module.exports = {
    registerUser,
    loginUser,
    verifyUserAccount
}