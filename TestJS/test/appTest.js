const assert=require('chai').assert;

//const app = require('../app');

const saldiMultiRemove = require('../app').saldiMultiRemove;

describe('App',function(){

    
    it.only("test sconto esempio 1", function(){
        let product="monitor";
        let quantity=12;
        let date='2021-09-24';
        //let query="SELECT * FROM supplier,owned,stock,has,promotion WHERE stock.productName LIKE '%"+product+"%' AND owned.idSt=stock.idSt AND supplier.idS=owned.idS AND owned.quantity>"+quantity+" AND owned.idO=has.idO AND has.idPromotion=promotion.idPromotion AND promotion.startPromotion<='"+date+"' AND promotion.endPromotion>='"+date+"' ORDER BY owned.shippingTime";
        let query="SELECT * FROM supplier,owned,stock,has,promotion WHERE stock.productName LIKE '%"+product+"%' AND owned.idSt=stock.idSt AND supplier.idS=owned.idS AND owned.quantity>="+quantity+" AND owned.idO=has.idO AND has.idPromotion=promotion.idPromotion ORDER BY owned.shippingTime";

        var mysql = require('mysql');
        console.log(query);
        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "restockdb"
        });
        con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
            if (err) throw err;
                var res=saldiMultiRemove(result,quantity,date);
                assert.equal(res[0][2],'1441.19');
                con.end();
                
            });
        });

    });
    it.only("test sconto esempio 2", function(){
        let product="monitor";
        let quantity=12;
        let date='2021-11-01';
        let query="SELECT * FROM supplier,owned,stock,has,promotion WHERE stock.productName LIKE '%"+product+"%' AND owned.idSt=stock.idSt AND supplier.idS=owned.idS AND owned.quantity>="+quantity+" AND owned.idO=has.idO AND has.idPromotion=promotion.idPromotion ORDER BY owned.shippingTime";

        var mysql = require('mysql');
        //console.log(query);
        var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "restockdb"
        });
        con.connect(function(err) {
        if (err) throw err;
        con.query(query, function (err, result, fields) {
            if (err) throw err;
                var res=saldiMultiRemove(result,quantity,date);
                assert.equal(res[0][2],'1459.20');
                con.end();
                
            });
        });

    });
    
});