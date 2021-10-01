const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('Express');
const app=express();
const port =3000;
const saldiMultiRemove = require('./app').saldiMultiRemove;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    console.log("running");
});

app.get("/test1", function (req, res) {
    let arr=[1,2,3]
    res.send(arr)
});
app.get("/test2/:id", function(req,res){
    console.log(req.params.id)
})
app.get("/query/:search/:date/:quantity",function(req,res){
    let product=req.params.search;
    let date=req.params.date;
    let quantity= req.params.quantity;
    console.log(product)
        //let quantity=12;
        //let date='2021-09-24';
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
                var resu=saldiMultiRemove(result,quantity,date);
                //res.send(resu[0][2]);
                res.send(resu);

                con.end();
                
            });
        });

})


app.listen(port, ()=>console.log("listening on port:"+port))