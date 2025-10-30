const cloudinary = require("cloudinary").v2;



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// cloudinary upload image
const cloudinaryUploadImage = async (fileToUpload) => {
    try{
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto",
        });
        return data;
    }
    catch (err)
    {
        throw new Error("Internal Server Error! (cloudinary)!");
        console.log(err);
    }
}


// cloudinary remove image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try{
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    }
    catch (err)
    {
        throw new Error("Internal Server Error! (cloudinary)!");
        console.log(err);
    }
}


// cloudinary remove multiples images
const cloudinaryRemoveImages = async (publicIds) => {
    try{
        const result = await cloudinary.api.delete_resources(publicIds);
        return result;
    }
    catch (err)
    {
        throw new Error("Internal Server Error! (cloudinary)!");
        console.log(err);
    }
}




module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveImages
};