const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const { Post , validateCreatePost , validateUpdatePost } = require("../models/Post");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");



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



/**
 * @desc     delete post
 * @route   /api/posts/:id
 * @method    DELETE
 * @access   private    (admin or owner of the post)
 */
const deletePost = asyncHandler(async (req , res) => {
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post NOT found."});
    }

    if(req.user.isAdmin || req.user.id === post.user.toString())
    {
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);
        //todo delete all comments
        return res.status(200).json({message: "post has been deleted successfully."})
    }
    return res.status(403).json({message: "access denied, forbidden."});
})



/**
 * @desc     update post
 * @route   /api/posts/:id
 * @method    PUT
 * @access   private    (owner of the post)
 */
const updatePost = asyncHandler(async (req , res) => {
    //validation 
    const { error } = validateUpdatePost(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    // get post from db and check
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post NOT found."});
    }

    // check if this post belongs to the user   [AUTHORIZATION]
    if(req.user.id !== post.user.toString())
    {
        return res.status(403).json({message: "access denied, you are not allowed"});
    }

    // update the post 
    const updatedPost = await Post.findByIdAndUpdate(req.params.id , {
        $set: {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
    },{new: true}).populate("user" , ["-password"]);

    // send res to client
    return res.status(200).json(updatedPost);
})



/**
 * @desc     update post image
 * @route   /api/posts/upload-image/:id
 * @method    PUT
 * @access   private    (owner of the post)
 */
const updatePostImage = asyncHandler(async (req , res) => {
    //validate image 
    if(!req.file)
    {
        return res.status(400).json({message: "NO image provided."});
    }

    // get post from db and check
    const post = await Post.findById(req.params.id);
    if(!post)
    {
        return res.status(404).json({message: "post NOT found."});
    }

    // check if this post belongs to the user   [AUTHORIZATION]
    if(req.user.id !== post.user.toString())
    {
        return res.status(403).json({message: "access denied, you are not allowed"});
    }

    // update the post image
        // remove the old image
        await cloudinaryRemoveImage(post.image.publicId);

        // upload the new image and save to db
        const imagePath = path.join(__dirname , `../images/${req.file.filename}`);
        const result = await cloudinaryUploadImage(imagePath);

        const updatedPost = await Post.findByIdAndUpdate(req.params.id , {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    },{new: true}).populate("user" , ["-password"]);

    fs.unlinkSync(imagePath);

    // send res to client
    return res.status(200).json(updatedPost);
})



module.exports = {
    createPost,
    getAllPosts,
    getPost,
    getPostsCount,
    deletePost,
    updatePost,
    updatePostImage
}