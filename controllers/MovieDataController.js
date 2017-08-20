var MovieData = require('../models/MovieData');
var mongoose = require('mongoose')
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
  find:function(params,callback){
    MovieData.find(params,(err,resp)=>{
      if(err){
        callback(err,null);
        return;
      }
      callback(null,resp)
    })
  }
}
