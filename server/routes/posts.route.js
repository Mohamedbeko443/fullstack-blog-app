const router = require("express").Router();
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const { createPost, getAllPosts , getPost, getPostsCount, deletePost, updatePost, updatePostImage  } = require("../controller/post.controller");
const  validateObjectId  = require("../middlewares/validateObjectId");


router.route("/")
    .post(verifyToken , photoUpload.single("image") , createPost)
    .get(getAllPosts);


router.route("/count")
    .get(getPostsCount);


router.route("/:id")
    .get(validateObjectId , getPost)
    .delete(validateObjectId , verifyToken , deletePost)
    .put(validateObjectId , verifyToken , updatePost);


    router.route("/upload-image/:id")
        .put(validateObjectId , verifyToken , photoUpload.single("image") , updatePostImage)


module.exports = router;