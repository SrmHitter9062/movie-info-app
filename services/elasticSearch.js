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
var indexName = "movies";
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
  isIndexExists:function(){
      return elasticClient.indices.exists({
        index:indexName
      });
  },
  createIndex:function(){
    return elasticClient.indices.create({
      index:indexName,
      // body : {
      //   "settings" : {
      //     "index" : {
      //         "number_of_shards" : 5,
      //         "number_of_replicas" : 2
      //     }
      //   }
      // }
    });
  }

}


  // deleteIndex:function(){
  //   return elasticClient.indices.delete({
  //     index:indexName
  //   });
  // },

// exports.isIndexExists = isIndexExists;
  // createMapping:function(){
  //   return elasticClient.indices.putMapping({
  //     index:indexName,
  //     type:"movie",
  //     body:{
  //       properties:{
  //         movie_name : {type:"string"},
  //         suggest:{
  //           type:"completion",
  //           analyzer:"simple",
  //           search_analyzer:"simple",
  //           payloads:true
  //         }
  //       }
  //     }
  //   })
  //
  // },
  // addDataToElasticIndex:function(document){
  //
  // },
  // getSuggestion:function(){
  //
  // }
