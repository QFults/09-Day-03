const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const { Owner } = require('./models')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(Owner.authenticate()))
passport.serializeUser(Owner.serializeUser())
passport.deserializeUser(Owner.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => Owner.findById(id)
  .populate('dogs')
  .then(user => cb(null, user))
  .catch(err => cb(err))))

app.use(require('./routes'))

require('./db')
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
