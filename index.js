//express
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//nodemon
const cors = require('cors');
const morgan = require('morgan');
app.use(morgan('combined'));
app.use(cors());

//showtoast
const showToast = require("show-toast");

//handlebars templating
const handlebars = require('express-handlebars')

let config = require('./config.js');
const mysql = require('mysql');

//google Auth method
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '1035084393625-m49ejigc2j57es8t6pigpvvc3l7r3sr6.apps.googleusercontent.com';
exports.CLIENT_ID = CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
exports.client = client;
const getGGToken = require('./googleAuth/google-token');
const { checkAuthenticated } = require("./googleAuth/checkAuthenticated");

app.post('/login', (req,res) => { getGGToken(req,res); } );

app.get('/profile', checkAuthenticated, (req,res) => {
    let user = req.user;
    res.render('main', {
        layout: 'profile',
        userInfos: user
    })
    
});

app.get('/logout', (req,res)=> {
    res.clearCookie('session-token');
    res.redirect('/');
})

//layout handler view engine
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}))

//render l'index '/'
app.get('/', (req, res) => {
    console.log(req.body);
    res.render('main', {layout: 'index'});
})

//render la page de création d'un post  :'/creation-post-form'
app.get('/creation-post-form',checkAuthenticated, (req, res) => {
    res.render('main', {layout: 'creation-post'});
})

//récup les infos du form :'/creation-post'
app.post('/creation-post', (req, res) => {
    const title = req.body.title;
    const postContent = req.body.postContent;
    const values = [title, postContent, 0];
    const sql = "INSERT INTO listpost(title,postContent,numberOfLike) VALUES(?)";
    connectionDB.query(sql, [values], function (err, data) {
        if (err) 
            throw err;
            //    console.log("User dat is inserted successfully ");
        }
    );
    res.redirect('/');
})

// create a connection variable with the required details
const connectionDB = mysql.createConnection(config.db);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
