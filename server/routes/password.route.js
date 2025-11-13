const router = require("express").Router();
const { sendResetPasswordLink, getPasswordLink, resetPassword } = require("../controller/password.controller");




// /api/password/reset-password-link
router.post("/reset-password-link" , sendResetPasswordLink)


// /api/password/reset-password/:userId/:token
router.route("/reset-password/:userId/:token")
    .get(getPasswordLink)
    .post(resetPassword)

module.exports = router;