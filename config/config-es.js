var Config = function(){
  this.esMapping = {
    movie:{ // keyName should be type
      index:"movies",
      type:"movie",
      body:{
          properties:{
            movieName : {type:"string"},
            suggest:{
              type:"completion",
              analyzer:"simple",
              search_analyzer:"simple",
              payloads:true
            }
          }
        }
    }
  };
  this.indexSetting = {
    movie:{ // keyName should be type
      index:"movies",
      body:{
        "settings" : {
          "index" : {
              "number_of_shards" : 5,
              "number_of_replicas" : 2
          }
        }
      }
    }
  }
}

module.exports = function(){
  return new Config();
}
