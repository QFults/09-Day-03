const router = require('express').Router()
const { Owner } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

Owner.obliterate = Owner.findByIdAndDelete

router.post('/owners/register', (req, res) => {
  const { name, email, username } = req.body
  Owner.register(new Owner({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/owners/login', (req, res) => {
  Owner.authenticate()(req.body.username, req.body.password, (err, owner) => {
    if (err) { console.log(err) }
    res.json(owner ? jwt.sign({ id: owner._id }, process.env.SECRET) : null)
  })
})

// GET all owner
router.get('/owners', passport.authenticate('jwt'), (req, res) => Owner.find()
  .populate('dogs')
  .then(owner => res.json(owner))
  .catch(err => console.log(err)))

// GET one owner
router.get('/owner', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// POST one owner
// router.post('/owners', passport.authenticate('jwt'), (req, res) => Owner.create(req.body)
//   .then(owner => res.json(owner))
//   .catch(err => console.log(err)))

// PUT one owner
router.put('/owners', passport.authenticate('jwt'), (req, res) => Owner.findByIdAndUpdate(req.user._id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one owner
router.delete('/owners', passport.authenticate('jwt'), (req, res) => Owner.obliterate(req.user._id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
