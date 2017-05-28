var mongoose = require("mongoose");

var MovieNameSchema = new mongoose.Schema({
  movieName:{type:"string",default:""},
  createdAt : {type:Date,default : Date.now},
  hasMovieData:{type:"string",default:"no"}
})

module.exports = mongoose.model("MovieNameSchema",MovieNameSchema);
