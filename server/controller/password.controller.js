const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateEmail, validateNewPassword  } = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");



/**
 * @desc    Send Reset Password Link
 * @route   /api/password/reset-password-link
 * @method  POST
 * @access  public
 */
module.exports.sendResetPasswordLink = asyncHandler(async (req , res) => {
    // validation
    const { error } = validateEmail(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }
    // get user from db 
    const user = await User.findOne({email: req.body.email});
    if(!user)
    {
        return res.status(404).json({message: "user with given email does not exists."});
    }
    // create verification token
    let verificationToken = await VerificationToken.findOne({
        userId: user._id
    });
    if(!verificationToken)
    {
        verificationToken = new VerificationToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        })
    }
    // create link 
    const link = `${process.env.CLINT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`
    // create html template 
    const template = `
        <a href="${link}" >  Click here to reset your password </a>
    `
    // send email 
    await sendEmail(user.email , "Reset Password" , template);
    // send response to client
    return res.status(200).json({message: "Password reset link sent to your email, please check your inbox."})
})




/**
 * @desc     Get Reset password link
 * @route    /api/password/reset-password/:userId/:token
 * @method    GET
 * @access  public
 */
module.exports.getPasswordLink = asyncHandler(async (req ,res) => {
    const user = await User.findById(req.params.userId);
    if(!user)
    {
        return res.status(400).json({message: "invalid link"});
    }

    const verificationToken = VerificationToken.findOne({
        userId: user._id,
        token: req.params.token
    });

    if(!verificationToken)
    {
        return res.status(400).json({message: "invalid link"})
    }


    return res.status(200).json({message: "valid url"});
})



/**
 * @desc      Reset password 
 * @route     /api/password/reset-password/:userId/:token
 * @method    POST
 * @access  public
 */
module.exports.resetPassword = asyncHandler(async (req , res) => {
    const { error } = validateNewPassword(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    const user = await User.findById(req.params.userId);
    if(!user)
    {
        return res.status(400).json({message: "invalid link"});
    }

    const verificationToken = await VerificationToken.findOne({
        userId: user._id,
        token: req.params.token
    });

    if(!verificationToken)
    {
        return res.status(400).json({message: "invalid link"});
    }

    if(!user.isAccountVerified)
    {
        user.isAccountVerified = true;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();
    await verificationToken.deleteOne();

    return res.status(200).json({message: "password reset successfully , please login"})

})