const { model, Schema } = require('mongoose')

const Owner = new Schema({
  name: String,
  email: String,
  dogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Dog'
  }]
})

Owner.plugin(require('passport-local-mongoose'))

module.exports = model('Owner', Owner)
