var mysql = require('mysql');

module.exports={
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
                                //console.log(result[i]['function'])4
                                //cost=cost-(cost/100)*(result[i]['discount']);
                                cost=discount(cost,result[i]['discount'],quantity,result[i]['function'])
                                promotion=promotion+result[i]['discount'];
                            }else{
                                //console.log(cost,">",result[i]['price']*quantity-((result[i]['price']*quantity)/100)*result[i]['discount'])
                                if(cost>result[i]['price']*quantity-((result[i]['price']*quantity)/100)*result[i]['discount']){
                                        //console.log('entro:',result[i]['price'])
                                        //console.log(result[i]['price']*quantity,"-",(result[i]['price']/100),"*",result[i]['discount'])
                                        //cost=result[i]['price']*quantity-((result[i]['price']*quantity)/100)*result[i]['discount'];
                                        cost=discount(result[i]['price'],result[i]['discount'],quantity,result[i]['function'])
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
    },
    discount
}
function sortByPrice(a,b){
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }

}

function discount(cost,discount,quantity,func) {
    if(func==0){
        return cost-(cost/100)*(discount);
    }else{
        return cost*quantity-((cost*quantity)/100)*discount;
    }

}