const asyncHandler = require("express-async-handler");
const { Comment , validateCreateComment , validateUpdateComment} = require("../models/Comment");
const { User } = require("../models/User");



/**
 * @desc    create new comment
 * @route   /api/comments
 * @method  POST
 * @access  private (logged in users)
 */
const createComment = asyncHandler(async (req , res) => {
    // validation
    const { error } = validateCreateComment(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details[0].message});
    }

    const profile = await User.findById(req.user.id);

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username
    });

    return res.status(201).json(comment);

})


/**
 * @desc    get all comments  
 * @route   /api/comments
 * @method  GET
 * @access  private (only admins)
 */
const getAllComments = asyncHandler(async (req , res) => {
    const comments = await Comment.find().populate("user",["-password"]);
    return res.status(200).json(comments);
})


/**
 * @desc    delete comment  
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admins or the owner of the comment himself)
 */
const deleteComment = asyncHandler(async (req , res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment)
    {
        return res.status(404).json({message: "Comment NOT found!"});
    }

    if(req.user.idAdmin || req.user.id === comment.user.toString())
    {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "comment has been deleted successfully."});
    }
    else
    {
        return res.status(403).json({message: "access denied, NOT allowed."})
    }

})


/**
 * @desc    update comment  
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (the owner of the comment himself)
 */
const updateComment = asyncHandler(async (req , res) => {
    const { error } = validateUpdateComment(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details.at(0).message});
    }

    const comment = await Comment.findById(req.params.id);
    if(!comment)
    {
        return res.status(404).json({message: "comment NOT found!"});
    }

    if(req.user.id !== comment.user.toString())
    {
        return res.status(403).json({message: "NOT allowed, access denied"});
    }

    const updatedComment = await Comment.findByIdAndUpdate(req.params.id , {
        $set: {
            text: req.body.text,
        }
    } , {new: true})

    return res.status(200).json(updatedComment);

})



module.exports = {
    createComment,
    getAllComments,
    deleteComment,
    updateComment
}