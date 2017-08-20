var esConfig = require('../config/config-es.js')();
var esService = require('../services/elasticSearch');
var controllers = require('../controllers')
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
    var query = {
      _id:"307831"
    }
    var movieDataController = controllers['movie'];
    movieDataController.find(query,(err,data)=>{
      console.log('data ',data);
    })
  }
}
