const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');

const connect = require('./config/database');
const {PORT} = require('./config/serverConfig');
const {passportAuth} = require('./config/jwt-middleware');
const apiroutes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/', apiroutes);
app.use(passport.initialize());

passportAuth(passport);

app.listen(PORT, async () => {
    console.log('Server started at ', PORT);
    await connect();
    console.log('MongoDB server connected');
});