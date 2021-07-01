const { model, Schema } = require('mongoose')

const Owner = new Schema({
  name: String,
  email: String,
  dogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Dog'
  }]
})

module.exports = model('Owner', Owner)
