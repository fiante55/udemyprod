const passport = require('passport')
// No app here for app.get

// We are exporting a function, this function argument is app and will be called

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] // Ask google for code with profile and email permission
    })
  )

  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
