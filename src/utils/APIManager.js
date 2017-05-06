import superagent from 'superagent'


export default {

  get:(url,params,callback)=>{
    superagent
      .get(url)
      .query(params)
      .set('Accept','applicaiton/json')
      .end((err,response)=>{
        if(err){
          callback(err,null)
          return
        }
        // have to check api faliur
        const status = response.body.status
        if(status != 'success'){
          callback({message:reponse.body.message},null)
          return
        }
        callback(null,response.body)
      })

  },
  post:(url,body,callback)=>{
    console.log("body : ",body);
    superagent
      .post(url)
      .send(body)
      .set('Accept','application/json')
      .end((err,response)=>{
        if(err){
          callback(err,null)
          return
        }
        // have to check api faliur
        const status = response.body.status
        if(status != 'success'){
          callback({message:reponse.body.message},null)
          return
        }
        callback(null,response.body)

      })

  },
  put:()=>{

  },
  delete:()=>{

  }


}
