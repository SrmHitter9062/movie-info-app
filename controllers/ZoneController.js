var Zone = require("../models/Zone")

module.exports = {
  find:function(params,callback){
    Zone.find(params,function(err,zones){
      if(err){
        callback(err,null)
        return
      }
      callback(null,zones)
    })

  },
  findById:function(id,callback){
    Zone.findById(id,function(err,zones){
      if(err){
        callback(err,null)
        return
      }
      callback(null,zones)
    })

  },
  create:function(params,callback){
    // var zipcodes = params['zipCodes'].split(',');
    // var zipArray = [];
    // zipcodes.forEach(function(zipCode){
    //   zipArray.push(zipCode.trim());
    //   //validate zipcodes(should be 5 digits)
    // })
    // params['zipCodes'] = zipcodes;
    Zone.create(params,function(err,zone){
      if(err){
        callback(err,null)
        return
      }
      console.log('zone created!!');
      callback(null,zone)
    })

  },
  update:function(id,params,callback){
    Zone.findByIdAndUpdate(id,params,{new:true},function(err,zone){
      if(err){
        callback(err,null);
        return;
      }
      console.log('zone updated!!');
      callback(null,zone)
    })

  },
  delete:function(id,callback){
    Zone.findByIdAndRemove(id,function(err){
      if(err){
        callback(err,null);
        return;
      }
      callback(null,null);
    })
  }

}
