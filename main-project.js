const express = require("express")
const app = express();
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
var userRoute = require("./app/routes/routeUser.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const PORT = process.env.NODE_DOCKER_PORT || 3001;




app.use('/user', userRoute);
//app.use('/api', apiRoute);


app.listen(PORT, () => {
    console.log("server RND ready http://localhost:3001")
})
