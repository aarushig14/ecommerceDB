/**
 * Created by a.gupta1409 on 17-04-2017.
 */


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'ecommerce',
    user: 'eccomerceuser',
    password: 'userpassword'
});

connection.connect();

module.exports = {
    addToCart: function (id,cb) {
        id = parseInt(id);

        let query = 'Select * from cart where id = ' + id;
        console.log(query);
        connection.query(query,function (err,res,col) {
            if(err) throw err;

            console.log(res.length + " :length");
            if(res.length == 0){
                let qry = 'Insert into cart values(' + id +"," + 1 +")";
                console.log(qry);
                connection.query(qry,function (err,res,col) {
                    if(err) throw err;
                    console.log(res);
                })
            }else{
                connection.query('Update cart set qty = qty + 1 where id = '+ id,function (err,res,col) {
                    if(err) throw err;
                })
            }
            cb(res);
        })

    },

    fetchProds: function (cb) {
        connection.query('SELECT * FROM products',function (err,res,col) {
            if(err) throw err;
            cb(res);
        })
    },

    showcart: function (cb) {
        let qry = "SELECT id,qty,name,imgsrc,price,(cart.QTY*products.PRICE) AS totalprice FROM CART NATURAL JOIN PRODUCTS";
        connection.query(qry,function (err,res,col) {
            if(err) throw err;
            cb(res);
        })

    }
}