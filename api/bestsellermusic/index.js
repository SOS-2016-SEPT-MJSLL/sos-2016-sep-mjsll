var express = require('express');
var app = module.exports = express();
var fs=require("fs");
var bodyParser = require('body-parser');
//var fs = require('fs');
// var login = require("../../queries/login");
// var pagination = require("../../queries/pagination");
// var governify = require("governify");


// governify.control(app,{
//   datastore: "http://datastore.governify.io/api/v6.1/",
//   namespace: "sos-2016-06-lbb",
//   defaultPath: "/api/v1/bestsellermusic/"
// });

// multiPlan_C1_sos-2016-06-lbb_ag



app.use(bodyParser.json());

var musics=[];

//MOSTRAR RECURSOS
app.get("/api/v1/bestsellermusic/loadInitialData", (req,res) => {
    music = [{release_year:"1980",country:"Australia",artist:"AC/DC",album:"Black in black",sales:"50"},
         {release_year:"1982",country:"EEUU",artist:"Michael Jackson",album:"Thriller",sales:"65"},
         {release_year:"1971",country:"Reino Unido",artist:"Led Zepellin",album:"Led Zepelin IV",sales:"37"},
         {release_year:"1977",country:"EEUU",artist:"Meat Loaf",album:"Bat Out of Hell",sales:"34"},
         {release_year:"1979",country:"Reino Unido",artist:"Pink Floyd",album:"The Wall",sales:"33"},
         {release_year:"1995",country:"Canada",artist:"Alanis Morissette",album:"Jagged Little Pill",sales:"33"},
         {release_year:"1967",country:"Reino Unido",artist:"The Beatles",album:"Sgt. Pepper's Lonely Hearts Club Band",sales:"32"},
         {release_year:"1976",country:"EEUU",artist:"Eagles",album:"Hotel California",sales:"32"},
         {release_year:"1987",country:"EEUU",artist:"Michael Jackson",album:"Dangerous",sales:"32"},
         {release_year:"1991",country:"EEUU",artist:"Mariah Carey",album:"Music Box",sales:"32"}];
    res.send(music);
  });

  // ////////////////////// GET /////////////////////
  // app.get('/api/v1/bestsellermusic', (req,res) => {
  //   var searched  = searchbyquery.searchbyquery(musics,req,res,"release_year");
  //   conjunt = pagination.pag(searched,req,res);
  //   if (conjunt == undefined || searched == ""){
  //     res.sendStatus(404);
  //   }else{
  //     res.send(conjunt);
  //   }
  // });


  // // //PAGINACIÓN,BÚSQUEDA
  // // //Limit: Número de resultados por página. Número de recursos que quiero.
  // // //Offset: Por qué recurso empiezo a mostrar.
  // // app.get('/api/v1/ncaabasketballs',login.ReadAccess,(req,res)=>{
  // //   var champion = req.params.champion;
  // //   var offset = req.query.offset;
  // //   var limit = req.query.limit;//En función de lo que valga limit hago o no el límite
  // //   var searched  = searchbyquery.searchbyquery(basks,req,res,"year");
  // //   var s = pag.returnASet(basks,limit,offset);
  // //   if (!limit || s == undefined || s.length == 0){
  // //     res.sendStatus(404);
  // //   }else{
  // //     res.send(s);
  // //   }
  // // });

//GET
//Acceder a todas las estadísticas de una ciudad o año
//,login.ReadAccess
app.get("/api/v1/bestsellermusic/:param", (req,res) => {
  var param = req.params.param;
  if(isNaN(param)){
    var s = searchByParams(musics, "country", param);
  }else{
    var s = searchByParams(musics, "release_year", param);
  }
  if(s==undefined){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});

//Acceder a una estadística concreta
app.get('/api/v1/bestsellermusic/:country/:release_year',(req,res) => {
	var country = req.params.country;
  var release_year = req.params.release_year;
  var s = searchByTwoParams(release_year,country);
  if(s==undefined){
    res.sendStatus(404);
  }else{
    res.send(s);
  };
});

//POST
//Crear una nueva estadística
//login.WriteReadAccess,
app.post("/api/v1/bestsellermusic",(req,res) => {
  var data=req.body[0];
  var dat = searchParams(req.body.release_year,req.body.country,req.body.artist,req.body.album,req.body.sales);
  var music = {release_year:req.body.release_year, country:req.body.country, artist:req.body.artist, album:req.body.album, sales:req.body.sales};
  if((isNaN(req.body.release_year))||(isNaN(req.body.sales))){ //Es false si lo que se le pasa no es un número
      res.sendStatus(409);
  }else if((req.body.release_year=="")||(req.body.country=="")||(req.body.artist=="")||(req.body.album=="")||(req.body.sales=="")){
      res.sendStatus(400);
  }else if(dat){
      res.sendStatus(409);
       }else{
    musics.push(music);
    res.sendStatus(201);
};
});

//POST a un recurso. Error 405 Method not allowed
app.post('/api/v1/bestsellermusic/:country',(req,res)=>{
  res.sendStatus(405);
});

app.post('/api/v1/bestsellermusic/:release_year',(req,res)=>{
  res.sendStatus(405);
});

app.post('/api/v1/bestsellermusic/:country/:release_year',(req,res) => {
  res.sendStatus(405);
});

//DELETE
//Eliminar un recurso según su ciudad o año
//,login.WriteReadAccess
app.delete("/api/v1/bestsellermusic/:param",(req,res) => {
  var param = req.params.param;
  if(isNaN(param)){
    var s = searchByParams(musics, "country", param);
  }else{
    var s = searchByParams(musics, "release_year", param);
  }
	if(s==undefined){
    res.sendStatus(404);
	}else{
    var index = musics.indexOf(s);
    musics.splice(index);
    res.sendStatus(200);
  }
});

app.delete('/api/v1/bestsellermusic/:country/:release_year',(req,res) => {
  var release_year = req.params.release_year;
	var country = req.params.country;
	var s = searchByTwoParams(release_year,country);
	if(s==undefined){
    res.sendStatus(404);
	}else{
    var index = musics.indexOf(s);
    musics.splice(index);
    res.sendStatus(200);
  }
});

//Borra todos los elementos
//login.WriteReadAccess,
app.delete('/api/v1/bestsellermusic',(req,res)=>{
//Quita elementos de una matriz, inserta nuevos elementos en su lugar si procede y devuelve los elementos eliminados.
	musics.splice(0,musics.length)
	res.sendStatus(200);
});


/////////////////// PUT //////////////////////////
app.put('/api/v1/bestsellermusic', (req,res) => {
	res.sendStatus(405);
});

app.put('/api/v1/bestsellermusic/:country/:release_year', (req,res) => {
    var country = req.params.country;
    var release_year = req.params.release_year;
  	var data_client=req.body[0];
//    if((req.body.release_year==release_year)&&(req.body.country==country)){
    var s = searchByTwoParams(release_year,country);
      if(s==undefined){
        res.sendStatus(404);
      }else{
        update(musics,"release_year","country",release_year,country,data_client);
        res.sendStatus(200);
      };
//    }else{
//      res.sendStatus(400);
//    }
  });


//FUNCIÓN AUXILIAR QUE BUSCA PARÁMETROS
function searchParams(release_year,country,artist,album,sales){
  var resultado;
  musics.forEach((music) => {
    if (music.release_year == release_year && music.country == country && music.artist == artist
    && music.album == album && music.sales == sales){
      resultado = music;
    };
  });
  return resultado;
}

//FUNCIÓN AUXILIAR QUE BUSCA UN PARÁMETRO
function searchByParams(arr,param1,content1){
  //Recorrer el array que contiene los datos.
	var searched = arr.filter(function (content) {
    //Es true si encontramos un año o ciudad igual a la que le pasamos por parámetro en la petición.
    	return content[param1] == content1;});
	return searched;
};

//FUNCIÓN AUXILIAR QUE BUSCA DOS PARÁMETROS
function searchByTwoParams(release_year,country){
  var resultado;
  musics.forEach((music) => {
    if (music.release_year == release_year && music.country == country){
      resultado=music;
  };
  });
  return resultado;
}

//FUNCIÓN AUXILIAR QUE ACTUALIZA UN PARÁMETRO
function update(arr,param1,param2,content1,content2,element){
  for (var i in arr) {
  	 if (arr[i][param1] == content1 && arr[i][param2] == content2){
        arr[i] = element;
     };
   };
};
