const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('Express');
const app=express();
const port =3000;

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


app.listen(port, ()=>console.log("listening on port:"+port))