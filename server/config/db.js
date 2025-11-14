const mongoose = require("mongoose");


async function connectToDb()
{
    try{
        await mongoose.connect(process.env.MONGO_CLOUD_URI , {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            maxPoolSize: 10,
            minPoolSize: 2,
            retryWrites: true,
            retryReads: true,
        });
        console.log("connected to mongoDB.");
    }
    catch (err)
    {
        console.log("Connection failed to MongoDb! " , err);
        // Retry connection after 5 seconds
        setTimeout(connectToDb, 5000);
    }
}


module.exports = connectToDb;