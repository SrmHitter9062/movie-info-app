#mongo db path
systemLog:
 destination: file
 path: /usr/local/var/log/mongodb/mongo.log
 logAppend: true
storage:
 dbPath: /usr/local/var/mongodb
net:
 bindIp: 127.0.0.1

#db-commands
 1) db states - db.stats() , [in bytes]
 2) collection states - db.movienameschemas.stats()
 3) collection data size - db.movienameschemas.dataSize()

#dump db
 1) go to project directory and run for dumping movie-info-app database - mongodump -d movie-info-app
   you can find dumped data in dump folder(i.e. cd /dump/movie-info-app)

# import database to your mongo to mongo cloud:
ref:https://www.mongodb.com/blog/post/atlas-on-day-one-importing-data
1) connect via mongo shell:
mongo "mongodb://srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017/test?replicaSet=srm-mongo-cloud-shard-0" --authenticationDatabase admin --ssl --username <USERNAME> --password

then enter password ->
OR

mongo "mongodb://srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017/test?replicaSet=srm-mongo-cloud-shard-0" --ssl --authenticationDatabase admin --username SrmHitter9062 --password <PASSWORD>

 mongo shell -> srm-mongo-cloud-shard-0:PRIMARY> show dbs;

2) connect via url string(dbUrl) :
mongodb://SrmHitter9062:<PASSWORD>@srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=srm-mongo-cloud-shard-0&authSource=admin

3)import your local database to mongo cloud:
mongorestore --db <DBNAME> --ssl --host srm-mongo-cloud-shard-0/srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017 --authenticationDatabase admin --dir=dump/<DBNAME> -u <USERNAME> --password <PASSWORD>

4) dump your db from mongo atlas cloud to your local machin:

mongodump --db <DBNAME> --ssl --host srm-mongo-cloud-shard-0/srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017 --authenticationDatabase admin --out=dump/<DBNAME> -u <USERNAME> --password <PASSWORD>
