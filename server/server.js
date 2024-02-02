const express = require('express')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 7000;
const routes = require('./routes/routes.js')
const uri = process.env.URI
const cookieParser = require('cookie-parser')
const flash = require('express-flash');

app.use(cookieParser())
app.use(flash())
app.use(express.urlencoded( { extended: false }))
app.use(express.json())
app.use(cors({origin: true, credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }));
app.use(routes)
app.use("./uploads", express.static('uploads'))


//connect to database
const connect = asyncHandler(async () => {
    await mongoose.connect(uri)
    console.log("Connected to Mongodb");
})

connect()


//connect to server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

