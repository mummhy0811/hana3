// setTimeout(function () {
//   console.log("depth1", new Date());
//   setTimeout(function () {
//     console.log("depth2", new Date());
//     setTimeout(function () {
//       console.log("depth3", new Date());
//       throw new Error("Already 3-depth!!");
//     }, 3000);
//   }, 2000);
// }, 1000);

// console.log("START!", new Date());



const depthTimer = n=> new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(n<=2) resolve(console.log(`depth${n}`, new Date()));
        if(n>=3) {
            console.log(`depth${n}`, new Date())
            reject(new Error("Already 3-depth!!"))
        };
    },n*1000);
    
});

depthTimer(1)
.then(()=>depthTimer(2)) 
.then(()=>depthTimer(3))
.catch(err => {console.error(err)});


//강사님 코드
const depthTimer2 = depth=> new Promise((resolve, reject)=>{

    setTimeout(()=>{
        console.log(`depth${depth}!!`, new Date());
        if(depth>=3) reject( new Error("Already 3-depth!!"));
        resolve(depth+1);
    },depth*1000);
});


//방법1
depthTimer2(1)
.then(depthTimer2) 
.then(depthTimer2)
.catch(err => console.error(err));

//방법2
(async() =>{
    try {
        const r1=await depthTimer2(1);
        const r2=await depthTimer2(2);
        const r3=await depthTimer2(3);
    } catch (err) {
        console.error(err);
    }
})();
