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
    addToCart: function (id,table,cb) {

        connection.query('Select * where id = ' + id,function (err,res,col) {
            if(err) throw err;
            if(res.size > 0){
                connection.query('Insert into cart values(' + id +"," + 1 +")",function (err,res,col) {
                    if(err) throw err;
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
        connection.query('SELECT * FROM products natural join cart',function (err,res,col) {
            if(err) throw err;
            cb(res);
        })
    },

    showcart: function (cb) {
        connection.query('SELECT * FROM products JOIN cart ON products.id = cart.id',function (err,res,col) {
            if(err) throw err;
            cb(res);
        })

    }
}