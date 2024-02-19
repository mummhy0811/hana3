const arr = [1, 3, 4, 2, 5, 8, 6, 7, 9];

function rangeSum(s=0, e=arr.length-1){
  let sum=0;
  for(let i=s;i<=e;i++){
    sum+= arr[i];
  }
  return sum;
}
console.log(rangeSum(2, 5));


function keyPair(arr:number[], sum:number){
    let memo:number[]=[];
    memo.fill(-1);
    for(let i=0;i<arr.length;i++){
        const target = sum-arr[i];
        if(memo[target]!=-1){
            return [memo[target], i];
        }
        memo[arr[i]]=i;
    }
}
console.log(keyPair([1, 3, 4, 5], 7));

// keyPair([1, 3, 4, 5], 7);             // [1, 2]
// keyPair([1, 4, 45, 6, 10, 8], 16);    // [3, 4]
// keyPair([1, 2, 4, 3, 6], 10);         // [2, 4]
// keyPair([1, 2, 3, 4, 5, 7], 9);  