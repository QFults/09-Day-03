const { model, Schema } = require('mongoose')

const Dog = new Schema({
  name: String,
  breed: String,
  age: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  }
})

module.exports = model('Dog', Dog)
