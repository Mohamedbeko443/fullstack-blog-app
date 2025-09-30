const router = require("express").Router();
const { registerUser } = require("../controller/auth.controller");




// /api/auth/register
router.post("/register" , registerUser);



module.exports = router