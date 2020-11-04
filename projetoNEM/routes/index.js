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

router.post('/preferencias', async function (req, res) {
    var db = require("../db");

    console.log("REQ ", req.body)

    var usuario = req.body.nome

    var novas_preferencias = req.body.preferencias

    var query = await db.Mongoose.model('usercollection', db.UserSchema,
        'usercollection').update({ username: usuario }, { $set: { preferencias: novas_preferencias } }).lean()

    res.json()
    res.end()
})

router.get('/preferencias', async function (req, res) {
    console.log("AQUI")
    var axios = require("axios").default;

    var options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/categories',
        params: { country: 'US' },
        headers: {
            'x-rapidapi-key': '5fcdd97c0dmshf8a624efffc8201p1858c2jsncd1085a6ba40',
            'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data);
        res.json(response.data)
        res.end()
    }).catch(function (error) {
        console.error(error);
        res.json(false)
        res.end()
    })
})

router.get('/home', function (req, res) {

    var produtos = [{
        position: { page: 1, position: 24, global_position: 23 },
        asin: 'B0875GQSL1',
        price: {
            discounted: false,
            current_price: 349,
            currency: 'USD',
            before_price: 0,
            savings_amount: 0,
            savings_percent: 0
        },
        reviews: { total_reviews: 23, rating: 2.1 },
        url: 'https://www.amazon.com/dp/B0875GQSL1',
        score: '48.30',
        sponsored: false,
        amazonChoice: false,
        bestSeller: false,
        amazonPrime: true,
        title: 'New Total Wireless Prepaid - Apple iPhone SE (64GB) - White [Locked to Carrier – Total Wireless] (MX9P2LL/A-TF)',
        thumbnail: 'https://m.media-amazon.com/images/I/81UhYiZH98L._AC_UY218_.jpg'
    }, {

        position: { page: 1, position: 20, global_position: 19 },
        asin: 'B07YMFYTYY',
        price: {
            discounted: true,
            current_price: 741.65,
            currency: 'USD',
            before_price: 899,
            savings_amount: 157.35,
            savings_percent: 17.5
        },

        reviews: { total_reviews: 268, rating: 4.5 },
        url: 'https://www.amazon.com/dp/B07YMFYTYY',
        score: '1206.00',
        sponsored: false,
        amazonChoice: false,
        bestSeller: false,
        amazonPrime: true,
        title: 'Google Pixel 4 XL - Clearly White - 64GB - Unlocked',
        thumbnail: 'https://m.media-amazon.com/images/I/71oTy+incwL._AC_UY218_.jpg'

    }]

    var json_geral = []
    var price = produtos[1].price.current_price

    var i = 0
    while (i < produtos.length) {
        var json = {};

        var price = produtos[i].price.current_price;
        var title = produtos[i].title;
        var link = produtos[i].url;
        var image = produtos[i].thumbnail;

        json.price = price;
        json.title = title;
        json.link = link;
        json.image = image;
        json_geral.push(json);

        i++;
    }
    console.log("-----------",json_geral)

    res.json()
    res.end()

});
