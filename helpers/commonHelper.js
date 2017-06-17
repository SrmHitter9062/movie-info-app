

module.exports = {
  getSerialPromiseResults:function(promiseArray){
    var a = new Promise.resolve(1);
    var b = new Promise.reject(new Error(2));
    var c = new  Promise.resolve(3);
    // promiseArray = [a,b,c];
    promiseResults = [];
    Promise.all(promiseArray.map(prm => prm.then(res=>res).catch(e => e)))
    .then((results) => { // get all executer promises
      promiseResults = results;
      console.log(results);
    })
    .catch(e => console.log(e));
    return promiseResults;
  },
  // smaple example
  serialExcPromises:function(){
    const arr = [1, 2, 3];
    var final = [];
    var promise1 = Promise.resolve()
    var promiseResults =  arr.reduce((promise1, item) => {
      return promise1
        .then((result) => {
          return this.asyncFunc(item).then((result) =>{
            final.push(result);
            console.log("success ",result);
          })
        })
        .catch((e)=>console.log("error bhai",e));
    }, Promise.resolve());

    promiseResults.then(() => console.log("final result is ",final);

  },
  function asyncFunc(item) {
    return new Promise((resolve, reject) => {
      // console.log("haha ",e)
      // setTimeout(() => resolve(e), e * 1000);
      if(item== 1)reject("error");
      else resolve("success");
    });
  }
}
