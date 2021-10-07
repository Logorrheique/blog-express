const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const handlebars = require('express-handlebars')
const mysqlActions = require('./utils');
// const SQLcommand = require('./mysqlActions');
//nodemon
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//connection to database and get element
//test database
let config = require('./config.js');
const mysql = require('mysql');



//layout handler view engine
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/'
}))
app.get('/', function (req, res) {
    res.render('main', {
        layout: 'index'
    })
})
// create a connection variable with the required details
const connectionDB = mysql.createConnection(config.db);

mysqlActions(app,connectionDB,'/database-select',"SELECT id,name FROM identity");


//launch
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

