const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");





const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 200,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

PostSchema.virtual("comments" , {
    ref: "Comment",
    foreignField: "postId",
    localField: "_id"
})

const Post = mongoose.model("Post" , PostSchema);



// validate create post 
function validateCreatePost(obj)
{
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(50).required(),
        description: Joi.string().trim().min(10).max(200).required(),
        category: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}


// validate update post 
function validateUpdatePost(obj)
{
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(50),
        description: Joi.string().trim().min(10).max(200),
        category: Joi.string().trim(),
    });
    return schema.validate(obj);
}


module.exports = {
    Post,
    validateCreatePost,
    validateUpdatePost,
}

