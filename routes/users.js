var express = require('express');
var router = express.Router();

const { User } = require('../db/models/models_index')


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll()
    
    if (users) {
      res.json(users)
    } else {
      res.status(404).send("no users found")
    }
  } catch (err) {
    next(err)
  }
});

module.exports = router;
