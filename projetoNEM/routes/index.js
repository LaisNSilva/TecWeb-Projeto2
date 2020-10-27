var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
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

/* POST ONE users. */
router.post('/users/', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection');
  var newuser = new User({
    username: req.body.name, email:
      req.body.email
  });
  newuser.save(function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json(newuser);
    res.end();
  });
});

/* PUT ONE user. */
router.put('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection');
  User.findOneAndUpdate({ _id: req.params.id }, req.body,
    { upsert: true }, function (err, doc) {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }
      res.json(req.body);
      res.end();
    });
});

/* DELETE ONE user. */
router.delete('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection',
    db.UserSchema, 'usercollection');
  User.find({ _id: req.params.id }).remove(function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      res.end();
      return;
    }
    res.json({ success: true });
    res.end();
  });
});

/* Login. */
router.get('/login', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema,
    'usercollection');
  var user = User({
    username: req.body.username, senha:
      req.body.senha
  });
  User.find({user}, (err, users) => {
    // users is an array which may be empty for no resultsif (err) {​​​​
    // handle errorreturn;
    if (users.length) {
      // there are user(s)
      res.json({success:true})
      res.end()

    } else {
      // there are no users
      res.json({success:false})
      res.end()
    }
  }​​​​);
    
});