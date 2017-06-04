var MovieName = require('../models/MovieName')
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var configDb = require('../config/config-db')();
var dbUrl = configDb.dbUrl.mongoCloudUrl;
mongoose.connect(dbUrl,function(err,res){
  if(err){
    console.log('db connection failed in movie helper: '+err);
  }
  else{
    console.log('db connection success in movie helper: '+dbUrl);
  }
})

module.exports = {
  insertMovieName:function(){
    for(var i = 0;i < 3000 ;i++){
      var movieObj = this.movieList[i];
      if(!movieObj)continue;
      var newMovieName =  new MovieName({
          movieName : movieObj.name.trim()
      });
      newMovieName.save(function(err,res){
        if(err){
          console.log("ERROR in creating movie name: " , movieObj.name);
          return;
        }
        console.log("SUCCESS in creating movie name: " , movieObj.name);
      })
    }
  },
  movieList:[
    {
    "name": "The 40-Year-Old Virgin"
    },
    {
    "name": "51 Birch Street"
    },
    {
    "name": "The Adventures of Sharkboy and Lavagirl in 3-D"
    },
    {
    "name": "on Flux"
    }
  ]
}
