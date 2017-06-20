var Config = function(){

  this.hostInfo = {
    tmdbHost : "https://api.themoviedb.org/3",
    host:"localhost:3000",
    tmdbApiKey :"1c0237c93183cfebcb09c14c7a08ec34"
  }

}

module.exports = function(){
  return new Config();
}
