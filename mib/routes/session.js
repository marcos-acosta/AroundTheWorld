const express = require("express");
const User = require("../models/User");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const sessionizeUser = require("../util/helper");
const config = require("../config/config.js");

const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const sessionUser = sessionizeUser(user);
        req.session.user = sessionUser
        res.send(sessionUser);
      } else {
        return res.status(404).json({ password: "Invalid credentials" });
      }
    });
  });
});

sessionRouter.delete("", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

sessionRouter.get("", ({ session: { user }}, res) => {
  res.send({ user });
});

module.exports = sessionRouter;