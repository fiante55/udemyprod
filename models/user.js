// Creation of mongoose model class User
const mongoose = require('mongoose')
const { Schema } = mongoose // same as : const Schema = mongoose.Schema;
// Mongoose as a property called schema, assign it to const Schema

// Schema defines properties of collection
const userSchema = new Schema({
  googleId: String
  // Can add properties as we go
})

module.exports = mongoose.model('users', userSchema) // Create collection if not there
