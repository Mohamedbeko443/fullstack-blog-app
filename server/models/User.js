const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png",
            publicId: null
        }
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    isAccountVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})



// generate auth tokens
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id , isAdmin: this.isAdmin},process.env.JWT_SECRET);
}


const User = mongoose.model("User" , UserSchema);



// validate register 
function validateRegisterUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(20).required(),
        email: Joi.string().trim().email().min(5).max(50).required(),
        password: Joi.string().trim().min(8).required(),
    });

    return schema.validate(obj);
}

// validate login 
function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().email().min(5).max(50).required(),
        password: Joi.string().trim().min(8).required(),
    });

    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
}

