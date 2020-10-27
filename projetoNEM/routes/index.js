var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


/* GET New User page. */
router.get('/newuser', function (req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  var db = require("../db");
  var Name = req.body.name;
  var userName = req.body.username;
  var Email = req.body.email;
  var senha = req.body.senha;
  var Users = db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection');
  var user = new Users({
    name: Name, username: userName, email:
      Email, senha: Senha
  });
  user.save(function (err) {
    if (err) {
      console.log("Error! " + err.message);
      return err;
    }
    else {
      console.log("Post saved");
      res.redirect("userlist");
    }
  });
});



/* Login. */
router.post('/login', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var user = User({
    username: req.body.username, senha: req.body.senha
  });
  User.find({user}, (err, users) => {
    // users is an array which may be empty for no resultsif (err) {​​​​
    // handle errorreturn;
    if (users.length) {
      // there are user(s)
      res.json({success: true});
      res.end();

    } else {
      // there are no users
      res.json({success: false});
      res.end();
    }
  
  }​​​​);
    
});