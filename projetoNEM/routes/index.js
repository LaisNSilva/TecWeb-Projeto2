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
    console.log(user)

    user.save(function (err) {
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
// --------------------------------------------------------------------------------
// o que lais fez dia 03/11
router.get('/home', function (req, res) {

    //var axios = require("axios").default;

    /*
    var options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/product/search',
        params: { keyword: 'iphone', page: '1', category: 'aps', country: 'US' },
        headers: {
            'x-rapidapi-key': '84721fb234msha6f8550a10782b7p1b20b4jsn1e0cbde5d09e',
            'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);

    });
    */

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
    },
    {
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
    var i = 0;

    while (i < produtos.length) {
        var json = {};

        var price = produtos[i].price.current_price;
        var desconto = produtos[i].price.savings_percent;
        var title = produtos[i].title;
        var link = produtos[i].url;
        var image = produtos[i].thumbnail;
        var pontuacao = produtos[i].score;
        var id = produtos[i].asin;

        json.pontuacao = pontuacao
        json.desconto = desconto
        json.price = price;
        json.title = title;
        json.link = link;
        json.image = image;
        json.id = id;
        json_geral.push(json);
        i++

    }



    console.log("-----------", json_geral)

    res.json(json_geral);
    res.end();



});


router.post('/busca', function (req, res) {

    console.log(req.body.keyword)
    var busca = req.body.keyword


    /*
    var axios = require("axios").default;

    
    var options = {
        method: 'GET',
        url: 'https://rapidapi.p.rapidapi.com/product/search',
        params: { keyword: busca,  country: 'US' },
        headers: {
            'x-rapidapi-key': '84721fb234msha6f8550a10782b7p1b20b4jsn1e0cbde5d09e',
            'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        var produtos = response.data.products
        console.log(response.data.products);

    */



    var json_geral = []
    var i = 0;


    /*
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
        i++

    }
    */



    console.log("-----------", json_geral)

    res.json(json_geral);
    res.end();


});

/*
.catch(function (error) {
    console.error(error);

});


//});

*/

router.post('/produto', function (req, res) {

    console.log(req.body.id)
    var idProduto = req.body.id


    /*
    var axios = require("axios").default;

    var options = {
    method: 'GET',
    url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/details',
    params: {asin: idProduto, country: 'US'},
    headers: {
        'x-rapidapi-key': '84721fb234msha6f8550a10782b7p1b20b4jsn1e0cbde5d09e',
        'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        var produto = response.data.product
        console.log(response.data.product);
        

    
   

    var json_geral = []
    
    
    
        var json = {};
        var title = produto.title;
        var description = produto.description;
        var recursos = produto.feature_bullets
        var link = produto.url;
        var price = produto.price.current_price;
        var image = produto.images;

        json.price = price;
        json.title = title;
        json.description = description;
        json.recursos = recursos;
        json.link = link;
        json.image = image;
        json_geral.push(json);
       
    */


   var json_produto =  [
    {
      price: 349,
      title: 'New Total Wireless Prepaid - Apple iPhone SE (64GB) - White [Locked to Carrier – Total Wireless] (MX9P2LL/A-TF)',
      description: '',
      recursos: [
        'Carrier - This phone is locked to Total Wireless from Tracfone, which means this device can only be used on the total wireless network.',
        "Plans – Total wireless offers a variety of coverage plans, including 30-day unlimited talk, text & data. Get the Nationwide coverage you need on America's largest, most dependable 4G LTE network. For more information or plan options, please visit the Total Wireless website.",
        'Activation - You’ll receive a total wireless SIM kit with this iPhone. Follow the instructions to get service activated with the total wireless plan of your choice.',
        '4.7-inch retina HD display',
        'Water and dust resistant (1 meter for up to 30 minutes, IP67)',
        '12MP wide camera; portrait mode, portrait lighting, depth control, next-generation smart HDR, and 4K video',
        '7MP front camera with Portrait mode, Portrait Lighting, and Depth Control',
        'Touch ID for secure authentication and Apple Pay',
        'A13 Bionic chip with third-generation Neural Engine',
        'Fast-charge capable'
      ],
      link: 'https://www.amazon.com/dp/B0875GQSL1',
      image: [
        'https://images-na.ssl-images-amazon.com/images/I/41arEqjjJwL._AC_SY879_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/21Gz4PDjbKL._AC_SY879_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/31oW6N1OgUL._AC_SY879_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/41queeRsPYL._AC_SY879_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/31evhbbON2L._AC_SY879_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/51d-akHdY7L._AC_SY879_.jpg',
        'https://m.media-amazon.com/images/I/31t1oAK-KhL._AC_SY879_.jpg'
      ]
    }
  ]


    console.log("-----------", json_produto)

    res.json(json_produto);
    res.end();


});

/*
.catch(function (error) {
    console.error(error);

});


});

*/







