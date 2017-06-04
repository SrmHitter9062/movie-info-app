var mongoose = require('mongoose');

var MovieDataSchema = new mongoose.Schema({
  _id:{type:Number,required:true},
  imdb_id:{type:String,require:true},
  title:{type:String,require:true},
  movie_name:{type:String,required:true},
  release_date:{type:String,require:true},
  original_language:{type:String,default:""},
  original_title:{type:String,default:""},
  runtime:{type:Number,default:0},
  overview:{type:String,default:""},
  popularity:{type:Number,default:0.0},
  genres:{type:Array,default:[]},
  status:{type:String,default:"Released"},
  tagline:{type:String,default:""},
  vote_average:{type:Number,default:0.0,min:0.0,max:10.0},
  vote_count:{type:Number,default:0},
  budget:{type:Number,default:0},
  revenue:{type:Number,default:0},
  production_companies:{type:Array,default:[]},
  production_countries:{type:Array,default:[]},
  spoken_languages:{type:Array,default:[]},
  belongs_to_collection:{type:Array,default:null},
  adult:{type:Boolean,default:false},
  created_at:{type:Date,default : Date.now},
  updated_at:{type:Date,default : Date.now},


},{ _id: false })

MovieDataSchema.index({_id:1,imdb_id:1,movie_name:1,release_date:1},{unique:true}) // compound index

module.exports = mongoose.model('MovieDataSchema',MovieDataSchema);
