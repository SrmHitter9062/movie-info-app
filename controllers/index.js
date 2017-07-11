var ZoneController = require('./ZoneController')
var CommentController = require('./CommentController')
var MovieNameController = require('./MovieNameController')
var MovieDataController = require('./MovieDataController');
module.exports = {
  comment:CommentController,
  zone:ZoneController,
  moviename:MovieNameController,
  movie:MovieDataController
}
