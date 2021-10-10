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
app.get('/creation-post-form', function (req, res) {
    res.render('main', {
        layout: 'creation-post',       
    })
    console.log("form display OK")
})
app.post('/creation-post',function(req, res, next){
    // let userId = parseInt(req.body.id);
    const title = req.body.title;
    const postContent = req.body.postContent;
    const values = [title,postContent,0];
    console.log(values);
    const sql = "INSERT INTO listpost(title,postContent,numberOfLike) VALUES(?)"
    connectionDB.query(sql,[values],function (err, data) { 
        console.log("INSERT INTO -> OK")
        if (err) throw err;
           console.log("User dat is inserted successfully "); 
    });
    res.redirect('/'); 
})
// create a connection variable with the required details
const connectionDB = mysql.createConnection(config.db);
//Create a database
// connectionDB.query("CREATE DATABASE blogExpressDB", function (err, result) {
//     console.log("Database Created !");
//   });
//action with SQL
mysqlActions(app,connectionDB,'/database-select',"SELECT id,name FROM listPost");
// connectionDB.query('CREATE TABLE listPost (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,title VARCHAR(30),postContent VARCHAR(500),numberOfLike INT)');

//launch
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

