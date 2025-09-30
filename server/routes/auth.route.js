const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth.controller");




// /api/auth/register
router.post("/register" , registerUser);


// /api/auth/login
router.post("/login" , loginUser);

module.exports = router