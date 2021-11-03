//express
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//handlebars templating
const handlebars = require('express-handlebars');

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '1035084393625-m49ejigc2j57es8t6pigpvvc3l7r3sr6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
exports.CLIENT_ID = CLIENT_ID;
exports.client = client;

const routes = require('./routes/routesModules');
//routes
app.use('/', routes.main);
app.use('/login', routes.login);
app.use('/logout', routes.logout);
app.use('/profile', routes.profile);
app.use('/create-post', routes.createPost);
app.use('/send-post', routes.sendPost);
app.use('/feed', routes.feed);
app.use('/manage-post', routes.managePost);
app.use('/modify',routes.modifyPost)

//layout handler view engine
app.use(express.static('public'));//maybe pour le style par layout 
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}))

//mysql Set up your database
const createDatabase = require('./db/configDatabase');
createDatabase();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});