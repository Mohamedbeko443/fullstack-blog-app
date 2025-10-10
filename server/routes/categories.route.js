const { createCategory, getAllCategories, deleteCategory } = require("../controller/categories.controller");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyAdmins } = require("../middlewares/verifyToken");

const router = require("express").Router();




router.route("/")
    .post(verifyAdmins , createCategory)
    .get(getAllCategories)


router.route("/:id")
    .delete(validateObjectId , verifyAdmins , deleteCategory);

module.exports = router;