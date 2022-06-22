const express = require("express")
const app = express();
var bodyParser = require('body-parser')
var path = require('path');
const { dirname } = require('path');
const axios = require('axios');
var flatten = require('flat')
var unflatten = require('flat').unflatten
var utility = require('./utilities/utility.js');
const fs = require('fs');



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




app.listen(3001, () => {
    console.log("server RND ready")
})
