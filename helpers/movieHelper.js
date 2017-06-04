var MovieName = require('../models/MovieName')
var MovieData = require('../models/MovieData')
var apiManager = require('./apiManager')
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
  insertMovieData:function(){
    var params = {
      api_key:"1c0237c93183cfebcb09c14c7a08ec34",
      language:"en-US",
      query : "sultan",
      page:1
    }
    var requestObj = {
      urlType:"tmdb",
      host:"https://api.themoviedb.org/3",
    }
    var movieIdList = [];
    var movieListCreationError = [];
    apiManager.makeApiCall("/search/movie","GET",params,requestObj,(resp)=>{
      console.log("SEARCH SUCCESS");
      var res = resp.results;
      for(var i = 0;i < res.length;i++){
        movieIdList.push(res[i].id);
      }
      console.log("movie id list : ",movieIdList);
      // make api call for movie detail
      if(movieIdList.length){
        var movideDetailsParams = {
          api_key:"1c0237c93183cfebcb09c14c7a08ec34",
          language:"en-US"
        }
        for(var i = 0;i < movieIdList.length;i++){
          apiManager.makeApiCall("/movie/"+movieIdList[i],"GET",movideDetailsParams,requestObj,(resp)=>{
            console.log("GET SUCCESS : ",resp.id);
            var movieDetail = this.getMovieDetail(resp);
            var newMovieDetail = new MovieData(movieDetail);
            //saving movie data in db
            newMovieDetail.save(newMovieDetail,(err,resp)=>{
              if(err){
                console.log("CREATION ERROR");
                movieListCreationError.push(movieIdList[i])
                return;
              }
              console.log("CREATION SUCCESS");
            })
          },(err)=>{
            console.log("GET ERROR");
          })
        }
      }

    },(err)=>{
      console.log("SEARCH ERROR: ",err);
    })

  },
  getMovieDetail:function(apiData){
    var movieDetail = {
      _id:apiData.id,
      imdb_id:apiData.imdb_id,
      title:apiData.title,
      movie_name:apiData.title,
      release_date:apiData.release_date
    }
    if(apiData.original_language){
      movieDetail.original_language = apiData.original_language
    }
    if(apiData.original_title){
      movieDetail.original_title = apiData.original_title
    }
    if(apiData.runtime){
      movieDetail.runtime = apiData.runtime
    }
    if(apiData.overview){
      movieDetail.overview = apiData.overview
    }
    if(apiData.popularity){
      movieDetail.popularity = apiData.popularity
    }
    if(apiData.genres){
      movieDetail.genres = apiData.genres
    }
    if(apiData.status){
      movieDetail.status = apiData.status
    }
    if(apiData.tagline){
      movieDetail.tagline = apiData.tagline
    }
    if(apiData.vote_average){
      movieDetail.vote_average = apiData.vote_average
    }
    if(apiData.vote_count){
      movieDetail.vote_count = apiData.vote_count
    }
    if(apiData.budget){
      movieDetail.budget = apiData.budget
    }
    if(apiData.revenue){
      movieDetail.revenue = apiData.revenue
    }
    if(apiData.production_companies){
      movieDetail.production_companies = apiData.production_companies
    }
    if(apiData.production_countries){
      movieDetail.production_countries = apiData.production_countries
    }
    if(apiData.spoken_languages){
      movieDetail.spoken_languages = apiData.spoken_languages
    }
    if(apiData.belongs_to_collection){
      movieDetail.belongs_to_collection = apiData.belongs_to_collection
    }
    if(apiData.adult){
      movieDetail.adult = apiData.adult
    }
    return movieDetail;

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
