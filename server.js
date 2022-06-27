const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var userRoute = require("./app/routes/routeUser.js");




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set up Global configuration access
dotenv.config();



app.use('/', userRoute);




app.listen(3001, () => {
    console.log("server RND ready")
})
