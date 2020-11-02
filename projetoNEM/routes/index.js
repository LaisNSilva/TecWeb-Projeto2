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

    console.log(req.body)
    var Name = req.body.name;
    var userName = req.body.username;
    var Email = req.body.email;
    var Senha = req.body.senha;

    var Users = db.Mongoose.model('usercollection', db.UserSchema,
        'usercollection');
    var user = new Users({
        name: Name, username: userName, email: Email, senha: Senha
    });
    Users.save(function (err) {
        if (err) {
            console.log("Error! " + err.message);
            return err;
        }
        else {
            console.log("Post saved");
            
        }
    });
});

router.post('/login', async function (req, res) {
    var db = require("../db");

    var Users = await db.Mongoose.model('usercollection', db.UserSchema,
        'usercollection');

    var userName = req.body.username;
    var userSenha = req.body.senha;

    await Users.find({ "username": userName, "senha": userSenha }, (err, users) => {
        if (users.length) {
            // there are user(s)

            res.json(users);
            res.end();

        } else {
            // there are no users
            res.json();
            res.end();
        }
    });
});



