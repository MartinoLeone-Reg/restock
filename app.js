var mysql = require('mysql');

module.exports={
    sayHello: function(){
        return 'hello';
    },
    sum: function(a,b){
        return (a+b)
    },
    con:function(query){
        var mysql = require('mysql');

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
            console.log(result);
            return result;
        });
        });
    },
    requestShipping:function(result){
            return result[0]['idS'];
        },
    saldiT:function(result,quantity,date){
        let res=[[]];
        //product
        //cost
        //shippig time
        //suppiler
        date = Date.parse(date);
        for(let i=0;i<result.length;i++){
            
            var startPromotion = Date.parse(result[i]['startPromotion']);
            var endPromotion = Date.parse(result[i]['endPromotion']);
            let cost=0;

            if(quantity>=result[i]['minPiece'] && result[i]['price']*quantity>=result[i]['orderValue'] && startPromotion<=date &&  endPromotion>=date){
                cost=(result[i]['price']*quantity)-(((result[i]['price']*quantity)/100)*result[i]['discount'])
                //console.log(cost);
            }else{
                cost=(result[i]['price']*quantity)
            }
            let arr=[result[i]['productName'],cost,result[i]['shippingTime'],result[i]['name']]
            res[i]=arr;
         
        }
        //console.log(res);
        res.sort(sortByPrice)
        //res.sort()
        //console.log(res);

        
        
        return res;
    }, 
 
    saldiMulti:function(result,quantity,date){
        let res=[[]];
        //product
        //cost
        //shippig time
        //suppiler
        //console.log(result);
        date = Date.parse(date);
        for(let i=0;i<result.length;i++){
            var g=0;
            var startPromotion = Date.parse(result[i]['startPromotion']);
            var endPromotion = Date.parse(result[i]['endPromotion']);
            let cost=result[i]['price']*quantity;
            console.log(quantity,result[i]['minPiece'])
            console.log(result[i]['price']*quantity,"",result[i]['orderValue'])
            console.log(startPromotion,"",date)
            console.log(endPromotion,">=",date)
            let check=true;
            
            if(quantity>=result[i]['minPiece'] && cost>=result[i]['orderValue'] && startPromotion<=date &&  endPromotion>=date){
                console.log("yoh",result[i]['discount']);
                cost=cost-(((result[i]['price']*quantity)/100)*result[i]['discount'])
                //console.log(cost);
            }
            b=i+1;
            console.log("a",i,b)
            while(result[i]['productName']==result[b]['productName'] && result[i]['name']==result[b]['name'] && check==true){
                    console.log(i<result.length ,"&&", result[i]['productName'],"==",result[b]['productName'] ,"&&", result[i]['name'],"==",result[b]['name'])
                    cost=cost-(((result[b]['price']*quantity)/100)*result[b]['discount']);
                    c=b+1;
                    i++
                    if(i<result.length && c<result.length){
                        console.log("p",i,b)
                        b++;
                    }else{
                        check=false;
                    }
            }
            console.log("b",i,b)

            let arr=[result[i]['productName'],cost,result[i]['shippingTime'],result[i]['name'],result[i]['discount'],result[i]['price'],quantity]
            res[i]=arr;
            
        }
        
        console.log(res);
        //res.sort(sortByPrice)
        //res.sort()
        //console.log(res);

        
        
        return res;
    },
    saldiMultiRemove1:function(result,quantity,date){
        let res=[[]];
        //product
        //cost
        //shippig time
        //suppiler
        //console.log(result);
        date = Date.parse(date);
        console.log("entro");

        for(let i=0;i<result.length;i++){
            var startPromotion = Date.parse(result[i]['startPromotion']);
            var endPromotion = Date.parse(result[i]['endPromotion']);
            let cost=result[i]['price']*quantity;
            console.log(quantity,result[i]['minPiece'])
            console.log(result[i]['price']*quantity,"",result[i]['orderValue'])
            console.log(startPromotion,"",date)
            console.log(endPromotion,">=",date)            
            if(quantity>=result[i]['minPiece'] && cost>=result[i]['orderValue'] && startPromotion<=date &&  endPromotion>=date){
                console.log("yoh",result[i]['discount']);
                cost=cost-(((result[i]['price']*quantity)/100)*result[i]['discount'])
                //console.log(cost);
            }
            

            let arr=[result[i]['productName'],cost,result[i]['shippingTime'],result[i]['name'],result[i]['discount'],result[i]['price'],quantity]
            res[i]=arr;
            
        }
        
        console.log(res);
        console.log("exit");
        let length=res.length;
        for(let i=0;i<length;i++){
            console.log("1")
            b=i;
            console.log("b:",b);
            console.log(b<length)
            if(b<length-1){
                console.log("2")
                while(res[i][0]==res[b][0] && res[i][3]==res[b][3]){
                    b++;
                    console.log(res[i][0],"==",res[b][0]," && ",res[i][3],"==",res[b][3])
                    res[i][1]=res[i][1]-((res[b][1]/100)*res[b][4]);
                    res[b]="";
                }
                console.log("i",i,"b",b," ",b-i);
                i=b;

            }else{
                console.log("5")

            }
        }
        //res.sort(sortByPrice)
        //res.sort()
        console.log(res);

        
        
        return res;
    },
    saldiMultiRemoveFunge:function(result,quantity,date){
        let res=[[]];
        //product
        //cost
        //shippig time
        //suppiler
        console.log(result);
        date = Date.parse(date);
        console.log("entro");
        let b=0;
        let c=0;

        for(let i=0;i<result.length;i++){
            var startPromotion = Date.parse(result[i]['startPromotion']);
            var endPromotion = Date.parse(result[i]['endPromotion']);
            let cost=0;
            console.log("no",result[i]['productName'])
            console.log(quantity,result[i]['minPiece'])
            console.log(result[i]['price']*quantity,"",result[i]['orderValue'])
            console.log(startPromotion,"",date)
            console.log(endPromotion,">=",date)
            b=i;
            let check=true;
            let promotion=0;
            if(quantity>=result[b]['minPiece'] && result[i]['price']*quantity>=result[b]['orderValue'] && startPromotion<=date &&  endPromotion>=date){
                console.log("i",i);
                console.log(result[b]['productName'],"==",result[i]['productName'],"&&",result[b]['name'],"==",result[i]['name'],"&&")
                    if(i<result.length-1 && result[b]['productName']==result[i]['productName'] && result[b]['name']==result[i]['name']){
                        while(i<result.length-1 && result[b]['productName']==result[i]['productName'] && result[b]['name']==result[i]['name'] && check==true){


                            console.log("yoh",result[i]['discount']);

                            //cost=cost+(((result[i]['price']*quantity)/100)*result[i]['discount']);
                            cost=cost+(result[i]['discount']);
                            promotion=promotion+result[i]['discount'];

                            console.log(cost);
                            if(i<result.length-1){
                                i++;

                            }else{
                                console.log('false');
                                check=false;
                                i--;
                            }
                        }
                        console.log("cost:",cost,"price",result[b]['price'])
                        cost=(cost*((result[b]['price']*quantity)/100));
                        console.log("cost 2:",cost)

                        i--;
                    }
            }
            

            let arr=[c,result[b]['productName'],cost,result[b]['shippingTime'],result[b]['name'],promotion,result[b]['price'],quantity];
            res[b]=arr;
            c++
            
        }
        //res.sort(sortByPrice)
        //res.sort()
        let resulted=[[]];
        console.log(res);
        for(let i=0;i<res.length;i++){
            if(res[i]!=undefined){
                console.log("(",res[i][6],"*",res[i][7],")-",res[i][2])
                let total=(res[i][6]*res[i][7])-res[i][2]
                console.log(total);
                resulted[res[i][0]]=[res[i][1],total,res[i][3],res[i][4]]
            }
        }
        console.log(resulted);

        
        
        return res;
    },
    saldiMultiRemove:function(result,quantity,date){
        let res=[[]];
        //product
        //cost
        //shippig time
        //suppiler
        //console.log(result);
        date = Date.parse(date);
        //console.log("entro");
        let b=0;
        let c=0;
        result[result.length]="";

        for(let i=0;i<result.length;i++){
            var startPromotion = Date.parse(result[i]['startPromotion']);
            var endPromotion = Date.parse(result[i]['endPromotion']);
            let cost=result[i]['price']*quantity;
            //console.log("no",result[i]['productName'])
            //console.log(quantity,result[i]['minPiece'])
            //console.log(result[i]['price']*quantity,"",result[i]['orderValue'])
            //console.log(startPromotion,"",date)
            //console.log(endPromotion,">=",date)
              
            b=i;
            let check=true;
            let promotion=0;
            //console.log(quantity>=result[b]['minPiece'] )
            //console.log(result[i]['price']*quantity>=result[b]['orderValue'])
            //console.log(startPromotion<=date &&  endPromotion>=date)

            if(quantity>=result[b]['minPiece'] && result[i]['price']*quantity>=result[b]['orderValue'] && startPromotion<=date &&  endPromotion>=date){
                //console.log("i",i);
                //console.log(result[b]['productName'],"==",result[i]['productName'],"&&",result[b]['name'],"==",result[i]['name'],"&&")
                    if(i<result.length-1 && result[b]['productName']==result[i]['productName'] && result[b]['name']==result[i]['name']){

                        while(i<result.length-1 && result[b]['productName']==result[i]['productName'] && result[b]['name']==result[i]['name'] && check==true){

                            if(result[i]['function']==0){
                                //console.log(result[i]['name']," prova ",cost,"-",(cost/100),"*",(result[i]['discount']));
                                //console.log(result[i]['function'])
                                cost=cost-(cost/100)*(result[i]['discount']);
                                promotion=promotion+result[i]['discount'];
                            }else{
                                //console.log(cost,">",result[i]['price']*quantity-(result[i]['price']/100)*result[i]['discount'])
                                if(cost>result[i]['price']*quantity-(result[i]['price']/100)*result[i]['discount']){
                                        //console.log('entro:',result[i]['price'])
                                        //console.log(result[i]['price']*quantity,"-",(result[i]['price']/100),"*",result[i]['discount'])
                                        cost=result[i]['price']*quantity-((result[i]['price']*quantity)/100)*result[i]['discount'];
                                        //console.log(cost);
                                        promotion=result[i]['discount'];

                                    }
                            }
                            if(i<result.length-1){
                                i++;

                            }
                        }   
                     i--;
                    }else{
                        //console.log("nop");
                        cost=cost-(cost/100)*(result[i]['discount']);
                        promotion=promotion+result[i]['discount'];

                    }
            }
            
            if(i!=result.length-1){
            let arr=[c,result[b]['productName'],cost.toFixed(2),result[b]['shippingTime'],result[b]['name'],promotion,result[b]['price'],quantity];
            res[b]=arr;
            c++
            }   
        }
        //console.log(res);
        res.sort(sortByPrice)
        return res;
    }
}
function sortByPrice(a,b){
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }

}
