const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User , validateUpdateUser } = require("../models/User");






/**
 * @desc    get all  users profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only admin)
 */
const getAllUsers = asyncHandler(async (req , res) => {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
})



/**
 * @desc    get user profile
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  private (only admin)
 */
const getUser = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select("-__v -password ");
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



module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    getUsersCount
}