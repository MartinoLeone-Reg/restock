
$(document).ready(function(){
    $('#button1').click(function(){
        console.log('button clicked');
        fetch('http://localhost:3000/test1')
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
    });});

