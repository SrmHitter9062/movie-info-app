var MovieData = require('../models/MovieData');

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
