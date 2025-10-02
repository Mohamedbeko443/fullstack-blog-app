const router = require("express").Router();
const { getAllUsers, getUser, updateUser, getUsersCount } = require("../controller/users.controller");
const {  verifyAdmins, verifyUsers } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");


// /api/users/profile
router.route("/profile")
    .get(verifyAdmins ,  getAllUsers)
    


//  /api/users/profile/:id 
router.route("/profile/:id")
    .get(validateObjectId , getUser)
    .put(validateObjectId , verifyUsers , updateUser)


// /api/users/profile
router.route("/count")
    .get(verifyAdmins ,  getUsersCount)
    


module.exports = router