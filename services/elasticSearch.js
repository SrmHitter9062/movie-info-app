var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  host: "http://localhost:9200",
  log:"info"
});
/*Elasticsearch automatically arranges the five primary shards split across the two nodes with one replica
nodes:2
shards:5
replica:1(of every shard)
*/
/* check if elastic server is down*/
elasticClient.ping({
  requestTimeout:3000
},function(err){
  if(err){
    console.log("elastic cluster is down!!!");
  }else{
    console.log("elastic cluster is up and running");
  }
});

module.exports = {
  isIndexExists:function(index){
      return elasticClient.indices.exists({
        index:index
      });
  },
  createMovieIndex:function(){
    return elasticClient.indices.create({
      index:"movies",
      body : {
        "settings" : {
          "index" : {
              "number_of_shards" : 5,
              "number_of_replicas" : 2
          }
        }
      }
    });
  },
  deleteIndex:function(index){
    return elasticClient.indices.delete({
      index:index
    });
  },
  createMovieMapping:function(){
    return elasticClient.indices.putMapping({
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
    })
  },
  addDataToMovieEsIndex:function(document){
    return elasticClient.index({
      index:"movies",
      type:"movie",
      body:{
        movieName:document.movie_name,
        suggest:{
          input : document.movie_name.split(" "), // array of words because want to match any word in movie name
          output : document.movie_name,
          payload : document
        }
      }
    })
  },
  getMovieSuggestion:function(query){
    console.log('here in getMovieSuggestion')
    return elasticClient.suggest({
      index:"movies",
      type:"movie",
      body : {
        movieResults:{
          text: query.movie_name,
          completion:{
            field : "suggeest",
            fuzzy : true
          }
        }
      }
    })
  }
}
