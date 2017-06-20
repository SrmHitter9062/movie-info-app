var express = require("express")
var router = express.Router()
var ZoneController = require("../controllers/ZoneController")
var controllers = require('../controllers')

router.get('/:resource/get_movie_by_id',function(req,res,next){
  console.log("your query is ",req.query)
  var resource = req.params.resource;
  var controller = controllers[resource];
  if(controller == null){
    res.json({
      status:'failed',
      message:'Invalid Resource request : '+resource
    })
    return;
  }
  res.json({
    confirmation : 'success',
    data : {'movies':[]}
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
