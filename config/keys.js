// keys.js - figure out what set of creds to return

if (process.env.NODE_ENV === 'production') {
  // prod
  module.exports = require('./prod')
} else {
  // dev
  module.exports = require('./dev')
}
