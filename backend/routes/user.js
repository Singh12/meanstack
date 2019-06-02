const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const user = new User({
    email: req.body.email,
    password: hash
  });
  user.save()
  .then(result => {
    res.status(201).json({
      message: 'User Created',
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
  });
});


router.post('/login',(req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    if (!user) {
      return res.status(401).json({Error: 'Auth Faild'});
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(
    result => {
      if(!result) {
        return res.status(404).json({error: 'Password wrong'});
      }
      // creating JWT using sign to create web token.
      const token = jwt.sign({email: fetchedUser.email, id: fetchedUser._id}, 'this_should_be_private', {expiresIn: "1h"});
      console.log(token);
      res.status(200).json({
        message: 'Loging Successful',
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({Error: 'Auth Faild'});
    })
});
module.exports = router;
