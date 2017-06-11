var MovieName = require('../models/MovieName')
var MovieData = require('../models/MovieData')
var apiManager = require('./apiManager')
var mongoose = require('mongoose')
var Promise = require('bluebird');
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
  getMovieNamData:function(){ // 30 done
    var skp =42;
    var lim =2;
    MovieName.find({},"movieName",(err,data)=>{
      if(err){
        console.log("mvoie name GET ERROR");
        return;
      }
      console.log("movie name GET SUCCESS ");
      this.insertMovieData(data);
    }).skip(skp).limit(lim);

  },
  insertMovieData:function(movieNameInfo){
    // console.log("movieNameData : ",movieNameInfo)
    var searchMoviePromises = this.getSearchMoviePromises(movieNameInfo);
    // parellel execution of searhc movie details
    Promise.settle(searchMoviePromises).then((searchResults)=>{ // Promise1
      searchResults.forEach((sResult)=>{ // for every movie search result
        if(sResult.isFulfilled()){
          console.log("SEARCH SUCCESS ");
          var res = sResult._settledValue.results;
          var movieIdList = [];
          for(var i = 0;i < res.length;i++){
            movieIdList.push(res[i].id);
          }
          if(movieIdList.length){
            console.log("movie ids count: ",movieIdList.length);
            var movideDetailsParams = {
              api_key:"1c0237c93183cfebcb09c14c7a08ec34",
              language:"en-US"
            }
            var getMovieIdPromises = this.getMovieIdPromises(movieIdList);
            // parallel call for all movie ids
            Promise.settle(getMovieIdPromises).then((results)=>{ // Promise 2
              var movieApiData = [];
              results.forEach((res,index)=>{
                if(res.isFulfilled()){
                  var movieDetail = this.getMovieDetail(res._settledValue);
                  movieApiData.push(movieDetail);
                }else{
                  console.log("MOVIE GET ID ERROR ", res.id , " ERROR : ",res._settledValue);
                }
              })
              var saveMIdsPromises = this.getMIdsPromisesForCreate(movieApiData);
              // parallel saving the movie data in db
              var saveTime1 = new Date().getTime() / 1000;
              Promise.settle(saveMIdsPromises).then(function(results){ // Promise 3
                var saveCount = 0;
                results.forEach((item)=>{
                  if(item.isFulfilled()){
                    saveCount += 1;
                    console.log("CREATION SUCCESS , ",item._settledValue.movie_name);
                  }else{
                    console.log("CREATION ERROR , ",item._settledValue.message);
                  }
                })
                console.log("SAVE COUNT :",saveCount)
                var saveTime2 = new Date().getTime() / 1000;
                console.log("Total movie data saving time ",saveTime2-saveTime1);
              })
            })
          }else{
            console.log("search result zero")
          }
        }else{
          console.log("SEARCH ERROR ",sResult._settledValue.message);
        }
      })
   })

  },
  getSearchMoviePromises:function(movieNameInfo){
    var promises = [];
    var requestObj = {
      urlType:"tmdb",
      host:"https://api.themoviedb.org/3",
    }
    for(var j = 0;j < movieNameInfo.length;j++){
      var params = {
        api_key:"1c0237c93183cfebcb09c14c7a08ec34",
        language:"en-US",
        query : movieNameInfo[j].movieName,
        page:1
      }
      var prm = new Promise(function(resolve,reject){
        apiManager.makeApiCall("/search/movie","GET",params,requestObj,(resp)=>{
          resolve(resp);
        },(err)=>{
          reject(err);
        })
      })
      promises.push(prm);
    }
    return promises;
  },
  getMovieIdPromises:function(movieIds){
    var promises = [];
    var movideDetailsParams = {
      api_key:"1c0237c93183cfebcb09c14c7a08ec34",
      language:"en-US"
    }
    var requestObj = {
      urlType:"tmdb",
      host:"https://api.themoviedb.org/3",
    }
    for(var i = 0;i < movieIds.length;i++){
      var prm = new Promise(function(resolve,reject){
        apiManager.makeApiCall("/movie/"+movieIds[i],"GET",movideDetailsParams,requestObj,(resp)=>{
          resolve(resp);
        },(err)=>{
          reject(err);
        });
      });
      // prm = Promise.resolve("YES");
      promises.push(prm);
    }
    return promises;

  },
  getMIdsPromisesForCreate:function(movieApiDataList){
    var promises = [];
    movieApiDataList.forEach((data)=>{
      var newMovieDetail = new MovieData(data);
      var prm = new Promise((resolve,reject)=>{
        newMovieDetail.save((err,resp)=>{
          if(err){
            reject(err)
          }
          resolve(resp);
        })

      })
      promises.push(prm);
    })
    return promises;

  },
  updateMovieNameDb:function(movieName,mId){
    MovieName.update({movieName : movieName},{hasMovieData:"yes",movieId:mId},(err,resp)=>{
      if(err){
        console.log("UPDATE ERROR IN MOVIENAME")
        return;
      }
      console.log("UPDATE SUCCESS IN MOVIENAME")
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
  testFunction(){
    var movieIds = ["307831","174445","280342","46800"];
    var promises = [];
    var movideDetailsParams = {
      api_key:"1c0237c93183cfebcb09c14c7a08ec34",
      language:"en-US"
    }
    var requestObj = {
      urlType:"tmdb",
      host:"https://api.themoviedb.org/3",
    }
    for(var i = 0;i < movieIds.length;i++){
      var prm = new Promise(function(resolve,reject){
        apiManager.makeApiCall("/movie/"+movieIds[i],"GET",movideDetailsParams,requestObj,(resp)=>{
          resolve(resp);
        },(err)=>{
          reject(err);
        });
      });
      // prm = Promise.resolve("YES");
      promises.push(prm);
    }
    // console.log("promise objects ",promises)
    var s1 = new Date().getTime() / 1000;
    Promise.settle(promises).then((results)=>{
      results.forEach((res,index)=>{
        if(res.isFulfilled()){
          console.log("success result is ",res.id);
        }else{
          console.log("error result is ",res._settledValue);
        }
      })
      var s2 = new Date().getTime() / 1000;
      console.log("total time ",s2-s1);
    }).catch((err)=>{
      console.log("rejected promise ",err);
    })
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
