# run elasticsearch
$ elasticsearch
# check indexes in elasticsearch
$ curl -XGET http://localhost:9200/_aliases
# health check(of elastic cluster)
$  curl -XGET http://localhost:9200/_cluster/health?pretty=true' or in enter    http://localhost:9200/_cluster/health?pretty=true' in browser

# index setting check (i.e. no of nodes,shards,replicas)
$ curl -XGET http://localhost:9200/_settings?pretty=true or http://localhost:9200/_settings?pretty=true in browser
# index setting update in elasticsearch
$ curl -XPUT 'localhost:9200/indexName/_settings' -d '
{
  "index" : {
    "number_of_shards": 2 ,
    "number_of_replicas" : 4
  }
}'

# putMapping for a type in index(ref. - https://www.elastic.co/guide/en/elasticsearch/reference/1.4/indices-put-mapping.html)
# indexing data to es index -https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html

$ curl -XPUT 'http://localhost:9200/indexName/_mapping/typeName' -d '
{
    "typeName" : {
        "properties" : {
            "message" : {"type" : "string", "store" : true }
        }
    }
}
'


# issues :
 1) in completion suggester - https://github.com/elastic/elasticsearch/issues/6444#issuecomment-64408912
