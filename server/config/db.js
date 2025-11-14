const mongoose = require("mongoose");


async function connectToDb()
{
    try{
        await mongoose.connect(process.env.MONGO_CLOUD_URI , {
            serverSelectionTimeoutMS: 30000, 
        });
        console.log("connected to mongoDB.");
    }
    catch (err)
    {
        console.log("Connection failed to MongoDb! " , err);
    }
}


module.exports = connectToDb;