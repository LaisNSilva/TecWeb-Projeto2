const { response } = require('express');
var express = require('express');
var router = express.Router();

// "bf088c4c77msh95f3011b4369a45p1ac6f0jsn58e57241eca0"

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
router.post('/home', async function (req, res) {

    function randomArrayShuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    var preferencias = req.body.preferencias

    preferencias = randomArrayShuffle(preferencias)

    var categoria = preferencias[0]

    console.log("CATEGORIA", categoria)

    var axios = require("axios").default;

    var options = {

        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
        params: { keyword: categoria, page: '1', country: 'US' },
        headers: {
            'x-rapidapi-key': '2d6c4a71b3msh055ddb0b280a61dp17cc58jsnd6f10fd27a85',
            'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
          }
    };

    await axios.request(options).then(function (response) {
        //console.log(response.data);

        var produtos = response.data.products

   

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
        //console.log("-----------", json_geral)
    
        res.json(json_geral);
        res.end();
    


    }).catch(function (error) {
        console.error(error);

    });

   

});


router.post('/busca', function (req, res) {

    console.log(req.body.keyword)
    var busca = req.body.keyword


    
    var axios = require("axios").default;

    
    var options = {
        method: 'GET',
        url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search',
        params: { keyword: busca,  country: 'US' },
        headers: {
            'x-rapidapi-key': '2d6c4a71b3msh055ddb0b280a61dp17cc58jsnd6f10fd27a85',
            'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
          }
    };

    axios.request(options).then(function (response) {
        var produtos = response.data.products
        console.log(response.data.products);

    



    var json_geral = []
    var i = 0;


    
    while (i < produtos.length) {
        var json = {};
        var price = produtos[i].price.current_price;
        var title = produtos[i].title;
        var link = produtos[i].url;
        var image = produtos[i].thumbnail;
        var desconto = produtos[i].price.savings_percent;
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


})


.catch(function (error) {
    console.error(error);

});


});



router.post('/produto', function (req, res) {

    console.log(req.body.id)
    var idProduto = req.body.id


    
    var axios = require("axios").default;

    var options = {
    method: 'GET',
    url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/details',
    params: {asin: idProduto, country: 'US'},
    
    headers: {
        'x-rapidapi-key': '2d6c4a71b3msh055ddb0b280a61dp17cc58jsnd6f10fd27a85',
        'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
        var produto = response.data.product
        //console.log(response.data.product);
        

    
   

    var json_produto = []
    
    
    
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
        json_produto.push(json);
       
    

  


    //console.log("-----------", json_produto)

    res.json(json_produto);
    res.end();


})


.catch(function (error) {
    console.error(error);

});


});





router.post('/avaliacao', function (req, res) {

    console.log(req.body.id)
    var idProduto = req.body.id


    
    var axios = require("axios").default;

    var options = {
    method: 'GET',
    url: 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews',
    params: {asin: idProduto, variants: '1', country: 'US'},
    headers: {
        'x-rapidapi-key': '2d6c4a71b3msh055ddb0b280a61dp17cc58jsnd6f10fd27a85',
        'x-rapidapi-host': 'amazon-product-reviews-keywords.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
        var reviews = response.data.reviews
        console.log(response.data.reviews);
    


    
   

    var json_avaliacao = []
    
    var i = 0;

    while (i < reviews.length) {
    
        var json = {};
        var data = reviews[i].review_data;
        var nome = reviews[i].name;
        var nota = reviews[i].rating;
        var title = reviews[i].title;
        var comentario = reviews[i].review;
        

        json.data = data;
        json.nome = nome;
        json.nota = nota;
        json.title = title;
        json.comentario = comentario;
        json_avaliacao.push(json);

    }
       
    



    console.log("-----------", json_avaliacao)

    res.json(json_avaliacao);
    res.end();


})



.catch(function (error) {
    console.error(error);

});

});















