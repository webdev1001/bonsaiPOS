var fs = require('fs');

var db = new DataBase();

function tokenIsHere(table_name, value) {
  lista = db.getTableDos(table_name);

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].token == value) {
      return true;
    }
  }
  return false;
}

        
function resetDropList(){
  $("#list").html("");
} 

$(document).ready(function () {


  $("#token").blur(function () {

    resetDropList();
    
    var token = $("#token").val();
    
    if (tokenIsHere("token", token))
      console.log("ya estas logueado");
    else {
      if (token != "") {
        var new_token = { "token": token };
        var list = []
        list.push(new_token);
        db.putTableDos("token", list);
        // alert("Token registrado");

        var user = db.getTableDos("token");
        var stores = {
          "async": true,
          "crossDomain": true,
          "url": "http://catolica.bonsaierp.com:3000/api/v1/stores",
          "method": "GET",
          "headers": {
            "token": user[0].token,
            "cache-control": "no-cache"
          }
        };

        $.ajax(stores).done(function (response) {
          var stores = response;
          // $("#almacen").text(response[1].name);
          if(stores.length != 0){
            for (var i = 0; i < stores.length; i++) {
              $("#list").append("<option value=" + response[i].name + ">" + response[i].name + "</option>");
            };  
          }
          
          
          
        });
      }else{
        var list = [];
        db.putTableDos("token", list);
        resetDropList();
      }
    }
  });



  $("#get_name").click(function () {

    var nombre_almacen = $("#list option:selected").text();
    if (nombre_almacen == ""){
      alert("Conexion erronea");
      $("#almacen").text("???????");            
    }
    else
      $("#almacen").text(nombre_almacen);
  });
});