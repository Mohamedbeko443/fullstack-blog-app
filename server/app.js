const express = require("express");
const connectToDb = require("./config/db");
require("dotenv").config();

// db connection 
connectToDb();

// init app
const app = express();




// middlewares
app.use(express.json());


// Routes
app.use("/api/auth" , require("./routes/auth.route"));



const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});