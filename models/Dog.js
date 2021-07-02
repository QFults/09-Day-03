const { model, Schema } = require('mongoose')

const Dog = new Schema({
  name: String,
  breed: String,
  age: Number,
  puppies: [
    {
      breed: String,
      age: Number,
      count: Number
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  }
})

module.exports = model('Dog', Dog)
