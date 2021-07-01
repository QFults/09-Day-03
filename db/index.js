module.exports = require('mongoose').connect('mongodb://localhost/dogsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
