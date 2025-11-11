const express = require("express");
const connectToDb = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();

// db connection 
connectToDb();

// init app
const app = express();




// middlewares
app.use(express.json());


// CORS policy
app.use(cors({
    origin: "*"
}))


// Routes
app.use("/api/auth" , require("./routes/auth.route"));
app.use("/api/users" , require("./routes/users.route"));
app.use("/api/posts" , require("./routes/posts.route"));
app.use("/api/comments" , require("./routes/comments.route"));
app.use("/api/categories" , require("./routes/categories.route"));
app.use("/api/password" , require("./routes/password.route"));

//! not found middleware
app.use(notFound)

//! error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});