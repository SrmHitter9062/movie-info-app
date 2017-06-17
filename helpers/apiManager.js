var http = require('http');
var request = require('request');
var configServer = require('../config/config-server')();

module.exports = {
  makeApiCall:function(apiurl,method,paramData,requestObj,successCb,errorCb){
    var options,path,_host;
    _host = configServer.hostInfo.host;
    if(requestObj && requestObj.host){ // if request obj has different host
      _host = requestObj.host;
    }
    options = {
      url: _host + apiurl,
      method: method,
      qs:paramData,
      json:true,
      timeout : 300000
    };
    this.apiRequestCall(options,successCb,errorCb);

  },
  apiRequestCall:function(options,successCb,errorCb){
    request(options,function(err,resp,body){
      if(err){
        console.log("error is ",err.message)
        errorCb({error:err.message});
      }
      // console.log("optins and resp status code ",options , " " ,resp.statusCode)
      if(resp && resp.statusCode == 200){
        successCb(body)
      }else{
        errorCb({error:"network error "})
      }
    })
    // var req;
    // req = request(options,(resp)=>{
    //   var apiData = "";
    //   console.log("request status code : ",resp.statusCode)
    //   // resp.setEncoding('utf8');
    //   resp.on('data',(chunks)=>{
    //     apiData += chunks;
    //   });
    //   resp.on("end",()=>{
    //     console.log("No more data in resp");
    //     successCb(JSON.parse(apiData));
    //   })
    //
    // }).on("error",(err)=>{
    //   console.log('request error: ' + err.message)
    //   return errorCb({error:err.message,statusCode:err.statusCode});
    // });
    //
    // req.on('timeout', function () {
    // // Timeout happend. Server received request, but not handled it
    // // (i.e. doesn't send any response or it took to long).
    // // You don't know what happend.
    // // It will emit 'error' message as well (with ECONNRESET code).
    //
    //   console.log('request timeout');
    //   req.abort();
    // });
    // req.setTimeout(30000);
    // req.end();
  }

}
