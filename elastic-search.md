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

# DELETE A TYPE IN A INDEX:
$ curl -XDELETE 'localhost:9200/IndexName/typeName'
ref - https://chartio.com/resources/tutorials/how-to-delete-data-from-elasticsearch/

# DELETE A DOCUMENT IN A TYPE:
curl -XDELETE 'localhost:9200/IndexName/typeName/1' (This will delete the document with an ID of 1)

# issues :
 1) in completion suggester - https://github.com/elastic/elasticsearch/issues/6444#issuecomment-64408912


 # success response after adding data to index:

 indexed -> { _index: 'movies',
  _type: 'movie',
  _id: 'AV4eXbLQYQb6aI96xv-E',
  _version: 1,
  result: 'created',
  _shards: { total: 3, successful: 1, failed: 0 },
  created: true }


# GET RECORDS IN INDEX :
 1) http://localhost:9200/movies/_stats/indexing?types=movie
ref - https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html OR
2) http://localhost:9200/IndexName/TypeNamepe/_count -> http://localhost:9200/movies/movie/_count


# get all index stats :
http://localhost:9200/_cat/indices?v

# get index data by id
http://localhost:9200/movies/movie/256002?pretty

# GET ALL MAPPING :
 - http://localhost:9200/_all/_mapping
 - http://localhost:9200/_all/_mapping/typeName

# GET RECORDS FROM ELASTCI SEARCH INDEX:
http://localhost:9200/indexName/typeName/_search?pretty=true&size=limit
(i.e - http://localhost:9200/movies/movie/_search?pretty=true&_source=movieName,suggest.input,suggest.payload&size=1)

OR  (CAN BE USED FOR RETRIVING SELECTED FIELDS)

curl -XGET 'http://localhost:9200/movies/movie/_search?pretty=true' -d '
{
    "query" : {
        "match_all" : {}
    },
    "_source": ["movieName","suggest.input"]
}'

# DELETE ALL RECORDS FROM INDEX, TYPE
- curl -XDELETE localhost:9200/indexName/typeName
(i.e. curl -XDELETE localhost:9200/movies/movie)

# DELETE RECORD FROM ES INDEX :
 - curl -XDELETE localhost:9200/movies/movie/indexDocumentID


# get Suggestions from es url :
http://localhost:9200/movies/movie/_search?q=movieName:Sultan




# ES scoring :
 - uses lucene(software library used for information retrieval based on fuzzy search on edit distance) under the hood
ref - https://www.compose.com/articles/how-scoring-works-in-elasticsearch/
explaination -
http://localhost:9200/movies/movie/280342/_explain?pretty=1&q=movieName=sultan [280342 - index record id]





# suggesting document result (internal)
example : query = mission impossible
step 1 : get all matched docs
        https://stackoverflow.com/questions/26394765/how-does-lucene-solr-elasticsearch-so-quickly-do-filtered-term-counts
        https://nlp.stanford.edu/IR-book/html/htmledition/processing-boolean-queries-1.html#fig:postings-merge-algorithm
        a) get list of documents for every term using invert indexing - O(N) where N - no. of records in es index
        b) intersect of all list of documents  to get final matched documents - O(l1+l2+l3 + ..) where l1, l2 etc are length of lists
step2 : relevance scoring
      https://www.compose.com/articles/how-scoring-works-in-elasticsearch/
      a) term frequency
      b) inverse document frequency
      c) field length normalization
