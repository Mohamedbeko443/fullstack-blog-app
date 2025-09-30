const mongoose = require("mongoose");


async function connectToDb()
{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB.");
    }
    catch (err)
    {
        console.log("Connection failed to MongoDb! " , err);
    }
}


module.exports = connectToDb;