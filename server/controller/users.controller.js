const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateUpdateUser } = require("../models/User");
const path = require("path");
const { cloudinaryUploadImage , cloudinaryRemoveImage, cloudinaryRemoveImages } = require("../utils/cloudinary");
const fs = require("fs");
const { Comment } = require("../models/Comment");
const { Post } = require("../models/Post");





/**
 * @desc    get all  users profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only admin)
 */
const getAllUsers = asyncHandler(async (req , res) => {
    const users = await User.find().select("-password").populate("posts");
    return res.status(200).json(users);
})



/**
 * @desc    get user profile
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public 
 */
const getUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select("-__v -password ").populate("posts");
    if(!user)
    {
        return res.status(404).json({message: "user not found!"});
    }
    res.status(200).json(user);
})



/**
 * @desc    update user profile
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private (only user)
 */
const updateUser = asyncHandler(async (req , res) =>{
    
    const { error } = validateUpdateUser(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    if(req.body.password)
    {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password , salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id , {
        $set: {
            username: req.body.username,
            password: req.body.password,
            bio: req.body.bio
        }
    },{new: true}).select("-password -__v");

    res.status(200).json(updatedUser);

})

/**
 * @desc     get users count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
 */
const getUsersCount = asyncHandler(async (req , res) => {
    const count = await User.countDocuments();
    return res.status(200).json({count});
})



/**
 * @desc    profile photo upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in users)
 */
const profilePhotoUpload = asyncHandler(async (req,res) => {
    // validation
    if(!req.file)
    {
        return res.status(400).json({message: "no file provided"});
    }

    // get the path to the image
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`); 

    // upload cloudinary
    const result = await cloudinaryUploadImage(imagePath);
    console.log(result);
    // get the user from db
    const user = await User.findById(req.user.id);
    // delete the old photo if exists
    if(user.profilePhoto.publicId !== null){
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
    // change the photo in the db 
    user.profilePhoto = {
        url: result.secure_url,
        publicId: result.public_id
    }
    await user.save();

    //remove image from server
    fs.unlinkSync(imagePath);

    return res.status(200).json({message: "your photo uploaded successfully.", profilePhoto: {url: result.secure_url}});
})



/**
 * @desc    delete profile
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (users & admins)
 */
    const deleteProfile = asyncHandler(async (req , res) => {
        const user = await User.findById(req.params.id);
        if(!user)
        {
            return res.status(404).json({message: "user not found."});
        }

        const posts = await Post.find({user: user._id});
        const publicIds = posts?.map(post => post.image.publicId);
        if(publicIds?.length > 0) 
        {
            await cloudinaryRemoveImages(publicIds);
        }

        if(user.profilePhoto.publicId !== null)
        {
            await cloudinaryRemoveImage(user.profilePhoto.publicId);
        }

        await Post.deleteMany({user: user._id});
        await Comment.deleteMany({user: user._id});

        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({message: "your profile has been deleted successfully."});

    })


    
module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    getUsersCount,
    profilePhotoUpload,
    deleteProfile
}