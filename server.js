const express = require('express'),
bodyParser = require('body-parser');
const cors = require('cors');

const syllabusRoutes = require('./app/routes/syllabus-routes');
const otherRoutes = require('./app/routes/other-routes');
const commonJs = require('./app/model/common.js');

const questionRoutes = require('./app/routes/allquestionroutes');
const questionMsaRoutes = require('./app/routes/question-msa-routes');
var path = require('path');
(app = express()), app.use(cors());
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    //var tagId=parseInt(Object.keys(commonJs.tagName).find(key => commonJs.tagName[key] === "Marks")) || 0;
    //var tagValueId=parseInt(Object.keys(commonJs.tagValue).find(key => commonJs.tagValue[key] === "0-100Marks")) || 0;
    res.json({
        message: process.env.ENV +'======'+process.env.PORT,
        data:'Question Migration application' // tagId+ "---" + tagValueId+"---"+process.env.USER_ID+"---"+process.env.USER_NAME
    });
});

//app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

require('./app/routes/questionroutes')(app); //importing route
//require('./app/routes/question-msa-routes')(app); //importing route
require('./app/routes/allquestionroutes')(app); //importing route
app.use('/syllabus', syllabusRoutes);
app.use('/scripts', otherRoutes);
app.use('/teachermsa', questionMsaRoutes);
require('./app/routes/weightageroutes')(app);
const PORT = process.env.PORT ;

const app__ = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app__.setTimeout(60 * 1000 * 1440 * 30); //1440 minutues //now 30 days
