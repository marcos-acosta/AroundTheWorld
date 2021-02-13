const express = require("express");
const router = express.Router();

const bottle = require("../../models/Bottle");
const user = require("../../models/User");

// @route POST api/bottles/new
// @desc Creates a new bottle
// @access Public
router.post("/new", (req, res) => {

  // NEED VALIDATION

  const newBottle = new Bottle({
    prompt: req.body.prompt,
    author: req.body.author,
    destination: req.body.destination
  });
  newBottle
    .save()
    .then(bottle => res.json(bottle))
    .catch(err => console.log(err));
});

module.exports = router;