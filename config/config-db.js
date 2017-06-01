
var Config = function () {
  this.dbUrl = {
    mongoCloudUrl : "mongodb://SrmHitter9062:mongo@srm-mongo-cloud-shard-00-00-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-01-tw5ax.mongodb.net:27017,srm-mongo-cloud-shard-00-02-tw5ax.mongodb.net:27017/movie-info-app?ssl=true&replicaSet=srm-mongo-cloud-shard-0&authSource=admin",
    localdbUrl : "mongodb://localhost:27017/movie-info-app"
  }
};

module.exports = function () {
  return new Config();
};
