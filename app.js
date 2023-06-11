const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const mongodb = require('./db/connect');
const session = require('express-session');
const passport = require('./middleware/passport');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json())
.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
})
.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
.use(passport.initialize())
.use(passport.session())
.use('/', router);

const port = config.port;

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
