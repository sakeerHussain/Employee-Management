const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorhandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const ejs = require('ejs');
const path = require('path');
const { sessionMid } = require("./authentication");
const cookieParser = require("cookie-parser");

 
const port = process.env.PORT || 5000;
const app = express();
connectDB()

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionMid);

// MiddleWare for static files
app.use(express.static("public"));
app.use("/uploads",express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static('assets'));

// setting Ejs as the view engine
app.set('view engine' , 'ejs');
// set the directory
app.set('views', path.join(__dirname, 'views'));  

// Route setup and Importing routes
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("", require("./routes/viewRoutes"));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});

