const router = require('express').Router()
const { Owner } = require('../models')

Owner.obliterate = Owner.findByIdAndDelete

// GET all owner
router.get('/owners', (req, res) => Owner.find()
  .populate('dogs')
  .then(owner => res.json(owner))
  .catch(err => console.log(err)))

// GET one owner
router.get('/owners/:id', (req, res) => Owner.findById(req.params.id)
  .populate('dogs')
  .then(owner => res.json(owner))
  .catch(err => console.log(err)))

// POST one owner
router.post('/owners', (req, res) => Owner.create(req.body)
  .then(owner => res.json(owner))
  .catch(err => console.log(err)))

// PUT one owner
router.put('/owners/:id', (req, res) => Owner.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

// DELETE one owner
router.delete('/owners/:id', (req, res) => Owner.obliterate(req.params.id)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
