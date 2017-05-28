var MovieName = require('../models/MovieName')

module.exports = {
  create:function(params,callback){
    MovieName.create(params,function(err,res){
      if(err){
        callback(err,null);
        return
      }
      callback(null,res);
    })
  },
  findById:function(params,callback){
    MovieName.findById(params,function(err,res){
      if(err){
        callback(err,null);
        return
      }
      callback(null,res);
    })
  },
  find:function(params,callback){
    MovieName.find(params,function(err,res){
      if(err){
        callback(err,null);
        return
      }
      callback(null,res);
    })
  }
}
