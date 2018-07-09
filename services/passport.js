const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users') // Avoid require user.js, it would load too many users model.

// Set cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
  /* Making use of mongo unique ID, because they can
  sign in with google, fb or linkedin */
})

// Read cookie
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      /* console.log('access token', accessToken)
      console.log('refresh token', refreshToken)
      console.log('profile', profile) */
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // We already have a record
            done(null, existingUser)
          } else {
            // We don't have a record
            new User({ googleId: profile.id })
              .save()
              .then(user => done(null, user))
          }
        })
    }
  )
)

// We configuration the passport that we use in authroute.js

/*

MissingSchemaError: Schema hasn't been registered for model "users".

Will happen when the model users has not been defined.
Or when passport is called before user.js

      User.findOne({ googleId: profile.id }) is asynchronous
      it does not return anything. Just a promise that it will return someday.

    Mongo is always, no matter what, asynchronous.

      user = User.findOne({ googleId: profile.id })
      would not work

*/
