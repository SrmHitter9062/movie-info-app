var ZoneController = require('./ZoneController')
var CommentController = require('./CommentController')
var MovieNameController = require('./MovieNameController')
var MovieDataControoler = require('./MovieDataController');
module.exports = {
  comment:CommentController,
  zone:ZoneController,
  moviename:MovieNameController,
  movie:MovieDataControoler
}
