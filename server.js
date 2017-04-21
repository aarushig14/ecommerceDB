/**
 * Created by a.gupta1409 on 17-04-2017.
 */

const express = require('express')
const bodyparser = require('body-parser')

const db = require('./products');

const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

app.use('/',express.static(__dirname + "/public_static"));

app.set('view engine','hbs');

// let products = [];

app.get('/',(req,res)=>{
    db.fetchProds(function (products) {
        res.render('main',{prod:products});
    })
});

app.post('/addToCart',(req,res)=> {
    console.log(req.body);
    db.addToCart(req.body.id,function (result) {
        console.log(result);
        res.redirect('/');
    })
});

app.get('/showcart',(req,res)=>{
    db.showcart(function (cart){
        res.render('cart',{cart:cart});
    })
})

app.listen(4567,function(){
    console.log("server 4567 active");
});