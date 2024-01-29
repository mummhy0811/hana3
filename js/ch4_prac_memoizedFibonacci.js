function memoized(fn) {
  const memoizedTable = {};
  return function (k) {
    return memoizedTable[k] || (memoizedTable[k] = fn(k));
  };
}

const fibonacci = memoized(function A (n){
    if(n==0 || n==1) return n;
    return fibonacci(n-1)+fibonacci(n-2);
})

console.log(fibonacci(9));