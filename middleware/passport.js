const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../db/connect');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const db = mongodb.getDb();
    const users = db.db('worldbuilding').collection('users');
    const { id, displayName, emails } = profile;
    const email = emails[0].value;

    let user = await users.findOne({ email });
    if (!user) {
      user = await users.insertOne({ googleId: id, name: displayName, email });
    }
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error);
  }
}
));


module.exports = passport;
