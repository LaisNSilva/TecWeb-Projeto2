var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end(); 
  });
});

/* GET ONE users. */
router.get('/user/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  User.find({ _id: req.params.id }).lean().exec(function (e,
docs) {
      res.json(docs);
      res.end();
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
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
  var user = new Users({name: Name, username: userName, email:
Email, senha: Senha });
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