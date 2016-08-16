var express = require("express");
var bodyParser = require("body-parser");//Para no tener que parsear el código
var app = express();
app.get("/",(req,res) => {
var r = "<html><style>A:link {color:#FF00FF;font-family: Comic Sans MS;}</style>"+
"<body background= 'http://img0.es.ndsstatic.com/wallpapers/c729ef940559b4a01ab38c4c0c608c54_large.jpeg'>"+"<p align='center'><font size=7><a href='/about'>About me</a>"+"</br>"+"<a href='/time'>Time</a>"
res.send(r);
});
app.use("/about", express.static('./static/soslinks1.html'));
app.get("/time",(req,res) => {
var date = "<html><style>h1 {color:#FF00FF; font-family: Comic Sans MS;}</style><h1>This is dynamic resourse that show the actual time:</html> </br></br>" +new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
res.send(date);
});
app.use("/about/bestsellermusic",express.static('./static/sos.html'));
app.use("/clientJSON",express.static('./static/clientJSON.html'));

var music = require('./api/bestsellermusic');
app.use(music);

var port = (process.env.PORT || 10001);
app.listen(port);
console.log(port);

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
