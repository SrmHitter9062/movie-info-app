var express = require("express")
var router = express.Router()
var ZoneController = require("../controllers/ZoneController")
var controllers = require('../controllers')

router.get('/getMovies',function(req,res,next){
  // console.log("your query is ",req)
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
  console.log('data is ',req.body);
  // req.body.zipCodes = req.body.zipCodes.split(',');
  var controller = controllers[resource];
  /* if controller does not exists*/
   if(controller == null){
     res.json({
       status:'fail',
       results: 'Invalid Resource Request : '+ resource
     })
     return
   }

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
