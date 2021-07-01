const router = require('express').Router()
const { Dog } = require('../models')

Dog.obliterate = Dog.findByIdAndDelete

// GET all dogs
router.get('/dogs', (req, res) => Dog.find()
  .then(dogs => res.json(dogs))
  .catch(err => console.log(err)))

// GET one dog
router.get('/dogs/:id', (req, res) => Dog.findById(req.params.id)
  .then(dog => res.json(dog))
  .catch(err => console.log(err)))

// POST one dog
router.post('/dogs', (req, res) => Dog.create(req.body)
  .then(dog => res.json(dog))
  .catch(err => console.log(err)))

// PUT one dog
router.put('/dogs/:id', (req, res) => Dog.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one dog
router.delete('/dogs/:id', (req, res) => Dog.obliterate(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
