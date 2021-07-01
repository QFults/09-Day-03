const { model, Schema } = require('mongoose')

const Dog = new Schema({
  name: String,
  breed: String,
  age: Number
})

module.exports = model('Dog', Dog)
