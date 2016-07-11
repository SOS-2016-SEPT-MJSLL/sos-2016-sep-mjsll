var express = require("express");
//var bodyParser = require("body-parser");//Para no tener que parsear el código
//var contactctl = require("./contactsctl.js");
var app = express();

app.get("/",(req,res) => {
var r = "<html><style>A:link {color:#FF00FF;}</style>"+
"<body>"+"<a href='/about'>About me</a>"
res.send(r);
});

// app.get("/about",(req,res) => {
//   var r = "<html><style>h1 {color:#FF00FF; font-family: Comic Sans MS;} p{color:black; font-family:Comic Sans MS; font-weight:700;} A:link {color:#FF00FF;}</style><head><h1>sos-2016-sep-mjsll</h1></head>"+
//   "<body>"+
//   "<p>Maria José Sosa Llorca: bestsellermusic</p> </br> <a href='https://es.wikipedia.org/wiki/Anexo:%C3%81lbumes_musicales_m%C3%A1s_vendidos'> Original data link </a>"+"</br>"+
//   "<a href='/about/bestsellermusic'>Data link on Page</a> <br>"
//   res.send(r);
// });

app.use("/about", express.static('./static/soslinks1.html'));
app.use("/about/bestsellermusic",express.static('./static/sos.html'));
app.use("/about/clientJSON",express.static('./static/clientJSON.html'));

//app.use(bodyParser.json());//Para que la aplicación use el bodyParser
var port = (process.env.PORT || 10000);
app.listen(port);
console.log(port);

//var apimjose = require('sos');
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
