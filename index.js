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

//handlebars templating
const handlebars = require('express-handlebars')

//mysql
const mysqlActions = require('./utils');
let config = require('./config.js');
const mysql = require('mysql');

//google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '1035084393625-m49ejigc2j57es8t6pigpvvc3l7r3sr6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

//render le /login : '/login'
app.get('/login', function (req, res) {
    res.render('main', {layout: 'login'})
})
//récup le token grace a une request POST depuis le /login
app.post('/login', function (req, res) {
    let token = req.body.token;
    console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token, audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend: [CLIENT_ID_1, CLIENT_ID_2,
            // CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain: const domain = payload['hd'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success');
        })
        .catch(console.error);
})
app.get('/profile', checkAuthenticated, function (req, res) {
    let user = req.user;
    res.render('main', {layout: 'profile', userInfos : user})        
    });

    app.get('/logout', function (req, res) {
        res.clearCookie('session-token');
        res.redirect('/login');
    })
    function checkAuthenticated(req, res, next) {

        let token = req.cookies['session-token'];

        let user = {};
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token, audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            });
            const payload = ticket.getPayload();
            user.name = payload.name;
            user.email = payload.email;
            user.picture = payload.picture;
        }
        verify()
            .then(() => {
                req.user = user;
                next();
            })
            .catch(err => {
                res.redirect('/login')//not verified so -> /login
            })

        }
    //layout handler view engine
    app.use(express.static('public'))
    app.set('view engine', 'hbs')
    app.engine('hbs', handlebars({
        layoutsDir: __dirname + '/views/layouts',
        extname: 'hbs',
        defaultLayout: 'index',
        partialsDir: __dirname + '/views/partials/'
    }))

    //render l'index '/'
    app.get('/', function (req, res) {
        res.render('main', {layout: 'index'})
    })

    //render la page de création d'un post  :'/creation-post-form'
    app.get('/creation-post-form', function (req, res) {
        res.render('main', {layout: 'creation-post'})
    })
    //récup les infos du form :'/creation-post'
    app.post('/creation-post', function (req, res, next) {
        // let userId = parseInt(req.body.id);
        const title = req.body.title;
        const postContent = req.body.postContent;
        const values = [title, postContent, 0];
        const sql = "INSERT INTO listpost(title,postContent,numberOfLike) VALUES(?)"
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

    // Create a database connectionDB.query("CREATE DATABASE blogExpressDB",
    // function (err, result) {     console.log("Database Created !");   }); action
    // with function in utils.js
    mysqlActions(
        app,
        connectionDB,
        '/database-select',
        "SELECT id,name FROM listPost"
    );
    // connectionDB.query('CREATE TABLE listPost (id INT NOT NULL PRIMARY KEY
    // AUTO_INCREMENT,title VARCHAR(30),postContent VARCHAR(500),numberOfLike
    // INT)'); launch
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
