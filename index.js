const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milisec
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app) // call functions, pass argument

const PORT = process.env.PORT || 5000
app.listen(PORT)

/* app.use = middleware
middlewares make adjustments/processing to requests before routehandlers
Avoids setting up auth verification on each route. It is by default
use on each request.
Can be setup for a specific portion of routes.

express-session = cookie stores ID that gives access to a document in mongodb (unlimited storage)
cookie-session = cookie stores user ID, and other info, limited to 4kb
*/
