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
const handlebars = require('express-handlebars');

//google auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '1035084393625-m49ejigc2j57es8t6pigpvvc3l7r3sr6.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
exports.CLIENT_ID = CLIENT_ID;
exports.client = client;

//import routes
const mainRoutes = require('./routes/mainRoutes');
const loginRoutes = require('./routes/loginRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const profileRoutes = require('./routes/profileRoutes');
const createPostRoutes = require('./routes/createPostRoutes');
const sendPostRoutes = require('./routes/sendPostRoutes');

//routes
app.use('/', mainRoutes)
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/profile', profileRoutes)
app.use('/create-post', createPostRoutes);
app.use('/send-post', sendPostRoutes);


//layout handler view engine
app.use(express.static('public'))//maybe pour le style par layout 
app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
