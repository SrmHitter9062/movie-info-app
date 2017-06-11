var mongoose = require("mongoose");

var MovieNameSchema = new mongoose.Schema({
  movieName:{type:String,required:true},
  createdAt : {type:Date,default : Date.now},
  hasMovieData:{type:String,default:"no"},
  movieId : {type:Number,default:null}
})

MovieNameSchema.index({movieName:1},{unique:true});// unique index is created for this field. see (db.db_name.getIndexes())

module.exports = mongoose.model("MovieNameSchema",MovieNameSchema);
