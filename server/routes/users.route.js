const router = require("express").Router();
const { getAllUsers, getUser, updateUser, getUsersCount, profilePhotoUpload, deleteProfile } = require("../controller/users.controller");
const {  verifyAdmins, verifyUsers, verifyToken, verifyAdminsAndUsers } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");


// /api/users/profile
router.route("/profile")
    .get(verifyAdmins ,  getAllUsers)
    


//  /api/users/profile/:id 
router.route("/profile/:id")
    .get(validateObjectId , getUser)
    .put(validateObjectId , verifyUsers , updateUser)
    .delete(validateObjectId , verifyAdminsAndUsers , deleteProfile )


// /api/users/profile
router.route("/count")
    .get(verifyAdmins ,  getUsersCount)


// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")
    .post(verifyToken , photoUpload.single("image") , profilePhotoUpload);
    


module.exports = router