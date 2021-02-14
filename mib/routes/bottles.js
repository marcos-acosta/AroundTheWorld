const express = require("express");
const router = express.Router();

const Bottle = require("../models/Bottle");
const User = require("../models/User");

// Load input validation
const validateBottleInput = require("../validation/bottle");
const validateMessageInput = require("../validation/message");

// @route POST api/bottles/new
// @desc Creates a new bottle
// @access Public
router.post("/new", (req, res) => {
  // Form validation
  const { errors, isValid } = validateBottleInput(req.body);

  // If not valid, return 400 with errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Look for a user with the given id
  User.findOne({ _id: req.body.author }).then(user => {
    if (user) {
      // Create bottle and save
      const newBottle = new Bottle({
        prompt: req.body.prompt,
        author: req.body.author,
        destination: req.body.destination
      });

      newBottle
        .save()
        .then(bottle => res.json(bottle))
        .catch(err => console.log(err));
    } 
    // No user found
    else {
      return res.status(400).json({ author: "No such author found!" });
    }
  });
});

// @route GET api/bottles/
// @desc Gets all bottles
// @access Public
router.get("/", (req, res) => {
  Bottle.find()
    .then(bottles => res.json(bottles))
    .catch(err => res.status(400).json(err));
});

// @route GET api/bottles/:id
// @desc Gets a specific bottles
// @access Public
router.route('/:id').get((req, res) => {
  Bottle.findById(req.params.id)
    .then(bottle => res.json(bottle))
    .catch(err => res.status(400).json(err));
});

// @route POST api/bottles/write/:id
// @desc Adds a message to a specific bottle
// @access Public
router.route('/write/:id').post((req, res) => {
  // Form validation
  const { errors, isValid } = validateMessageInput(req.body);

  // If not valid, return 400 with errors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Bottle.findById(req.params.id)
    .then(bottle => {
      bottle.responses.push(req.body);

      bottle.save()
      .then(() => res.json('Bottle updated!'))
      .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;