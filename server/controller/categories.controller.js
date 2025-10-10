const asyncHandler = require("express-async-handler");
const { Category , validateCreateCategory} = require("../models/Category");




/**
 * @desc    create new category
 * @route   /api/categories
 * @method  POST
 * @access  private (admins)
 */
module.exports.createCategory = asyncHandler(async (req , res) => {
    const { error } = validateCreateCategory(req.body);
    if(error)
    {
        return res.status(400).json({message: error.details.at(0).message});
    }

    const category = await Category.create({
        title: req.body.title,
        user: req.user.id
    })

    return res.status(201).json(category);
})


/**
 * @desc    get all categories
 * @route   /api/categories
 * @method     GET
 * @access  public 
 */
module.exports.getAllCategories = asyncHandler(async (req , res) => {
    const categories = await Category.find();
    return res.status(200).json(categories);
})


/**
 * @desc    delete category
 * @route   /api/categories/:id
 * @method   DELETE
 * @access  private (only admins) 
 */
module.exports.deleteCategory = asyncHandler(async (req , res) => {
    const {id: categoryId} = req.params;

    const category = await Category.findById(categoryId);
    if(!category)
    {
        return res.status(404).json({message: "Category NOT found!"});
    }

    await Category.findByIdAndDelete(categoryId);
    return res.status(200).json({message: "category has been deleted successfully."});
})








