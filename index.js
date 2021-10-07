const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const handlebars = require('express-handlebars')

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
const con = mysql.createConnection(config.db);
//connection to DB and display data from DB
con.connect(function (err) {
    if (err) throw err;
    app.get('/database', function (req, res) {
        con.query("SELECT id,name FROM identity", function (err, result, fields) {
            res.render('main', {
                layout: 'dataDB',
                dataID: result
            })
            if (err) throw err;
        });
    })
});

//launch
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

