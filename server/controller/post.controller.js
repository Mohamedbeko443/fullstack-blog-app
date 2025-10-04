const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post , validateCreatePost , validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage } = require("../utils/cloudinary");


/**
 * @desc    create new post
 * @route   /api/posts
 * @method  POST
 * @access  private (logged in users)
 */
const createPost = asyncHandler(async (req , res) => {
    // image validation 
    if(!req.file)
    {
        return res.status(400).json({message: "no image provided."});
    }
    // data validation
    const { error } = validateCreatePost(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }
    // upload photo
    const imagePath = path.join(__dirname , `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
    // create new post and save to db
    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: req.user.id,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        }
    })
    
    // delete the photo from server
    fs.unlinkSync(imagePath);
    // send response 
    return res.status(201).json(post);
})



/**
 * @desc   get posts
 * @route   /api/posts
 * @method  GET
 * @access  public 
 */
const getAllPosts = asyncHandler(async (req , res) => {
    const limit = 3 ; 
    const {pageNumber  , category} = req.query;
    let posts;
    if(pageNumber)
    {
        posts = await Post.find()
        .skip((pageNumber - 1) * limit)
        .limit(limit)
        .sort({createdAt:  -1})
        .populate("user" , ['-password']);
    }
    else if (category)
    {
        posts = await Post.find({category})
        .sort({createdAt:  -1})
        .populate("user" , ['-password']);
    }
    else{
        posts = await Post.find().sort({createdAt:  -1}).populate("user" , ['-password']);
    }

    return res.status(200).json(posts);
})


/**
 * @desc     get post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public 
 */
const getPost = asyncHandler(async (req , res) => {
    const post = await Post.findById(req.params.id).populate("user",['-password']);
    if(!post)
    {
        return res.status(404).json({message: "post NOT found."});
    }

    return res.status(200).json(post);
})



/**
 * @desc     get posts count
 * @route   /api/posts/count
 * @method  GET
 * @access  public 
 */
const getPostsCount = asyncHandler(async (req , res) => {
    const count = await Post.countDocuments();
    return res.status(200).json({count});
})

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getPostsCount
}