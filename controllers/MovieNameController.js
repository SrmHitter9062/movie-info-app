var MovieName = require('../models/MovieName')
// for checking any index error in movieName schema
MovieName.on('index', error => {
  if(error)console.log("index error in movie name controller : ",error);
  else console.log("No error indexes in movieName schema");
})

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
