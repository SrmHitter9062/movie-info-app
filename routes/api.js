var express = require("express")
var router = express.Router()
var ZoneController = require("../controllers/ZoneController")
var controllers = require('../controllers')
var validationHelper = require('../helpers/validationHelper');
var elasticSearch = require('../services/elasticSearch');

/*movie details by id api=>
 pathname - api/movie/get_movie_by_id
 queryParams - movie_id=[307831]
 */
router.get('/movie/get_movie_by_id',function(req,res,next){
  var queryString = req.query || {};
  var controller = controllers['movie'];
  var validationResult = validationHelper.validateGetMovieByIdApiQueryParams(req.query);
  if(validationResult.validation == false){
    res.json({
      status:'fail',
      message: 'Invalid or missing query params'
    })
    return
  }
  controller.find(validationResult.queryObj,function(err,resp){
    if(err){
      res.json({
        status:'fail',
        message:"NOT FOUND"
      })
      return
    }
    // do anything with response if needed
    res.json({
      status : 'success',
      results : resp
    })
  })
})
/* movie search by text api */
router.get('/get_movie_by_search',function(req,res,next){
  var controller = controllers['movie'];
  var validationResult = validationHelper.validateGetMovieBySearchQueryParams(req.query);
  if(validationResult.validation == false){
    res.json({
      status:'fail',
      message:"Invalid or missing query params"
    })
  }
  console.log('validationResult ',validationResult);
  elasticSearch.getMovieSuggestion(validationResult.queryObj).then((res)=>{
    res.json({
      status:'success',
      results:res
    })

  }).catch((err)=>{
    res.json({
      status:'fail',
      message:'Error in getting suggetion'
    })
  })



})

router.get('/:resource',function(req,res,next){
  var resource = req.params.resource
  var controller = controllers[resource];
  console.log('controller resource is ->',resource);
 /* if controller does not exists*/
  if(controller == null){
    res.json({
      status:'fail',
      message: 'Invalid Resource Request : '+ resource
    })
    return
  }
  controller.find(req.query,function(err,results){
    if(err){
      res.json({
        status:'fail',
        message : 'Not Found'
      })
      return
    }
    res.json({
      status:'success',
      results:results
    })

  })

})

router.get('/:resource/:id',function(req,res,next){
  var resource = req.params.resource
  var id = req.params.id
  var controller = controllers[resource];
  /* if controller does not exists*/
   if(controller == null){
     res.json({
       status:'fail',
       results: 'Invalid Resource Request : '+ resource
     })
     return
   }
  controller.findById(id,function(err,result){
    if(err){
      res.json({
        status:'fail',
        results : 'Not Found'
      })
      return
    }
    res.json({
      status:'success',
      results:result
    })
  })

})

router.post('/:resource',function(req,res,next){
  var resource = req.params.resource
  // req.body.zipCodes = req.body.zipCodes.split(',');
  console.log('resource is ', resource);
  var controller = controllers[resource];
  /* if controller does not exists*/
   if(controller == null){
     res.json({
       status:'fail',
       results: 'Invalid Resource Request : '+ resource
     })
     return
   }
  console.log("req body is ",req.body);
  controller.create(req.body,function(err,result){
    if(err){
      res.json({
        status:'fail',
        results:err
      })
      return
    }
    res.json({
      status:'success',
      results: result
    })
  });

})



module.exports = router
