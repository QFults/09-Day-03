const router = require('express').Router()
const { Dog, Owner } = require('../models')
const passport = require('passport')

Dog.obliterate = Dog.findByIdAndDelete

// GET all dogs
router.get('/dogs', passport.authenticate('jwt'), (req, res) => Dog.find()
  .populate('owner')
  .then(dogs => res.json(dogs))
  .catch(err => console.log(err)))

// GET one dog
router.get('/dogs/:id', passport.authenticate('jwt'), (req, res) => Dog.findById(req.params.id)
  .populate('owner')
  .then(dog => res.json(dog))
  .catch(err => console.log(err)))

// POST one dog
router.post('/dogs', passport.authenticate('jwt'), (req, res) => Dog.create({
  name: req.body.name,
  breed: req.body.breed,
  age: req.body.age,
  owner: req.user._id
})
  .then(dog => Owner.findByIdAndUpdate(dog.owner, { $push: { dogs: dog._id } })
    .then(() => res.json(dog))
    .catch(err => console.log(err)))
  .catch(err => console.log(err)))

// PUT one dog
router.put('/dogs/:id', passport.authenticate('jwt'), (req, res) => Dog.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one dog
router.delete('/dogs/:id', passport.authenticate('jwt'), (req, res) => Dog.obliterate(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
