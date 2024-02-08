// const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';

// const promiFetch = url => new Promise((resolve, reject)=>{
//     fetch(url)
//         .then(res => res.json())
//         .then(resolve); //.then(data => resolve(data))와 동일
// });

// const asyncFetch = async url => {
//     const res = await fetch(url);
//     const data = await res.json();

//     return data;
// }; 


// const data = promiFetch(sampleUrl);
// console.log("🚀 ~ data:", data);

// const data2 = asyncFetch(sampleUrl);
// console.log("🚀 ~ data2:",  data2);
// (async () => {
//     const data = await promiFetch(sampleUrl);
//     console.log("🚀 ~ data:", data);

//     const data2 = await asyncFetch(sampleUrl);
//     console.log("🚀 ~ data2:", data2);
// })();

const f = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  
    if (!res.ok) throw new Error("Failt to Fetch!!");
  
    //2초 sleep
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await res.json();
  
    return data.name;
  };
  
  console.log( await f()); 

  const rets1=[1, 2, 1].map(sec=>afterTime(sec));
  console.log("🚀 ~ rets1:", rets1);
  const rets2=[];

  for await(const ret of rets1){
    rets2.push(ret);
  }
  console.log("🚀 ~ rets2:", rets2);
  const rets3=await Promise.all(rets1);
  console.log("🚀 ~ rets3:", rets3);

  const rets4=(await Promise.allSettled())
  
  