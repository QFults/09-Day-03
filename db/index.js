module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/dogsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
