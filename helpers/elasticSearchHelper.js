var esConfig = require('../config/config-es.js')();
var esService = require('../services/elasticSearch');
// var controllers = require('../controllers')
var movieDataModel = require('../models/MovieData');
var mongoose = require('mongoose')
var bluebirdPromise = require('bluebird');
var configDb = require('../config/config-db')();
var dbUrl = configDb.dbUrl.mongoCloudUrl;
mongoose.connect(dbUrl,function(err,res){
  if(err){
    console.log('db connection failed in movie data controller : '+err);
  }
  else{
    console.log('db connection success in movie data controller : '+dbUrl);
  }
})

module.exports = {
  createMappingMovieIndex : function(){
    var mapping = esService.createMovieMapping().then(mp=>{
      console.log("success in creation movie mapping ",mp);
    }).catch(err=>{
      console.log("error in creating movie mapping",err);
    });
  },
  indexingOfMovieRecords:function(){
    // get 10 records and do indexing
    var skip = 800;
    var limit = 200;
    movieDataModel.find({},(err,resp)=>{
      if(err){
        console.log("error in fetching data");
      }
      var addIndexingPromises = [];
      var tobeIndexed = resp.length;
      for(var i = 0;i < resp.length;i++){
        console.log(resp[i]._id , " ",resp[i].movie_name)
        addIndexingPromises.push(esService.addDataToMovieEsIndex(resp[i]));
      }
      var successfullIndexed = 0;
      /* see all addindexing promises whether they are added or not*/
      bluebirdPromise.settle(addIndexingPromises).then((indexdData)=>{
        indexdData.forEach((indexedMovieData,index)=>{
          /*
          data is like { _index: 'movies',
          _type: 'movie',
          _id: '215617',
          _version: 1,
          result: 'created',
          _shards: { total: 3, successful: 1, failed: 0 },
          created: true }
          */
          if(indexedMovieData.isFulfilled()){
            successfullIndexed += 1;
            console.log("Movie data has been indexed ",indexedMovieData._settledValue)
          }else{
            console.log("***************Movie data has not been indexed ",indexedMovieData._settledValue)
          }
        });
        console.log("tobeIndexed:",tobeIndexed , ",successfullIndexed:",successfullIndexed,",failedIndexed:",tobeIndexed-successfullIndexed);
      }).catch((err)=>{
        console.log("error in settling all addIndexingPromises: All failed ",err)
      })
    }).skip(skip).limit(limit);
  }
}
