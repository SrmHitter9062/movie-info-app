Getting started

requirements:
-node
-express
-mongo
-mongoose
-react

for setting up env follow:
ref:https://www.youtube.com/watch?v=F7wLAXOHl2c

#to run the project , do below things
- go to project folder
1) run the app server
 $ nodemon app.js
2) run the mongo server
 $ mongod -dbpath /mydatabase/db
3) run webpack for auto build
 $ webpack -w


 # run project on machine using mongocloud atlas:

 1) connect to mongo server:
 $ mongo  "mongodb://srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017/test?replicaSet=srm-mongo-cloud-shard-0" --ssl --authenticationDatabase admin --username SrmHitter9062 --password <PASSWORD>

 2) run application:
 $ nodmon app.js

 2) run elasticsearch:
 $ elasticsearch
