const { createComment, getAllComments, deleteComment, updateComment } = require("../controller/comments.controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyAdmins } = require("../middlewares/verifyToken");

const router = require("express").Router();




router.route("/")
    .post(verifyToken ,  createComment)
    .get(verifyAdmins , getAllComments)


router.route("/:id")
    .delete( validateObjectId , verifyToken , deleteComment)
    .put(validateObjectId , verifyToken , updateComment)

module.exports = router
