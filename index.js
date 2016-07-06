var express = require("express");
var bodyParser = require("body-parser");//Para no tener que parsear el código
//var contactctl = require("./contactsctl.js");
var port = (process.env.PORT || 10000);
var app = express();

app.use(bodyParser.json());//Para que la aplicación use el bodyParser

app.listen(port);


//var apimjose = require('./lib/api-mjose/films');
//app.use(apimjose)

//var basketb = require('./lib/api-mjose/basketball');
//app.use(basketb);

//app.use("/about/ncaabasketball", express.static(__dirname+'/static/ncaabasketball.html'));

//app.get("/about/ncaabasketballrender",(req,res) => {
//  var bask=[];
//  fs.readFile('ncaabasketball.json','utf8',(err,content) => {
//    bask = JSON.parse(content);
//    res.render('ncaabasketball',{
//      titulo : "Champions of Basketball Division I in NCAA",
//      content : bask
//    });
//  });
//});

//*******CHANGE FOR LOCAL TEST*****

//////// PUERTO USADO EN HEROKU /////
//var port = (process.env.PORT || 8080)
//app.listen(port); /////
/////////////////////////////////////
//SLA
//var sla = require('./lib/sla');
//app.use(sla);
