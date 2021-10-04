
$(document).ready(function(){
    $('#button1').click(function(){
        let search=document.getElementById('orderSearch').value
        let date=document.getElementById('orderDate').value 
        let quantity=document.getElementById('orederQuantity').value
        let counter=0;
        if(search!="" && date!="" && quantity)
        console.log('button clicked:',search," ",date,"  ",quantity);
        fetch('http://localhost:3000/query/'+search+"/"+date+"/"+quantity)
        .then(response => response.json())
        .then(result => {
           if(result.length>0){ 
            console.log(result)
            for(let i=0;i<result.length;i++){
              if(result[i]==null){
                console.log("Null="+i);
                counter++
              }
            }
            html = "<table class='table'><thead><tr><th scope='col'>Product Name</th><th scope='col'>Price</th><th scope='col'>Shipping</th><th scope='col'>Supplier</th><th scope='col'>Discount</th><th scope='col'>Single Price</th></tr></thead><tbody>";
                for(let i=0;i<result.length-counter;i++){
                    console.log(result[i])
                    html+='<tr>'
                    console.log(result[i].length)
                        for(let g=1; g<result[i].length-1;g++){
                            html+="<th>"+result[i][g]+"</th>"

                        }

                    html+='</tr>'
                }    
                html += "</tbody></table>";
            }else{
              html+="<div class='card w-75'> <div class='card-body'> <h5 class='card-title'>Card title</h5> <p class='card-text'>With supporting text below as a natural lead-in to additional content.</p><a href='#' class='btn btn-primary'>Button</a> </div> </div>"
            }
            document.getElementById("container").innerHTML = html;
        })

    });
    $("#Search").submit(function(e) {
      e.preventDefault();
  });
    
});
function tableCreate() {
    var body = document.getElementsByTagName('result');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 3; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 2; j++) {
        if (i == 2 && j == 1) {
          break
        } else {
          var td = document.createElement('td');
          td.appendChild(document.createTextNode('\u0020'))
          i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
          tr.appendChild(td)
        }
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
  }