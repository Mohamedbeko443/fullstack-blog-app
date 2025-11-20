const express = require("express");
const connectToDb = require("./config/db");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();
const { xss } = require("express-xss-sanitizer");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

// init app
const app = express();


const options = {
    allowedTags: [null]
}

// middlewares
app.use(express.json());

// security headers (helmet)
app.use(helmet());

// prevent http param pollution
app.use(hpp());

// prevent xss attacks
app.use(xss(options));

// rate limiting
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 200
}))


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

// Connect to DB and start server
async function startServer() {
    await connectToDb();
    app.listen(PORT , ()=>{
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    });
}


startServer();