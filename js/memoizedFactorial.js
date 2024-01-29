//1. 재귀
//O(N)
let runCnt = 0;
function beforeMemoizationfactorial(n) {
  runCnt += 1;
  if (n === 1) return 1;
  return n * beforeMemoizationfactorial(n - 1);
}
console.log(beforeMemoizationfactorial(3), runCnt);
console.log(beforeMemoizationfactorial(5), runCnt);
console.log("----");

//2. memoized
//O(logN)
const memoizedTable = {}; // 실행 결과 저장
runCnt = 0;
function factorial(n) {
    runCnt += 1;
  if (n === 1) return 1;
  return memoizedTable[n] || (memoizedTable[n] = n * factorial(n - 1));
}
console.log(factorial(3), runCnt);
console.log(factorial(5), runCnt);
console.log("----");

//3. memoized 순수함수로 변경
runCnt = 0;
function memoized(fn) {
  const memoizedTable = {};
  return function (k) {
    //memoizedTable을 참조하는 함수를 리턴
    // if(memoizedTable[k]) return memoizedTable[k];
    // return (memoizedTable[k] = fn(k));

    //간소화
    return memoizedTable[k] || (memoizedTable[k] = fn(k));
  };
}

const memoizedFactorial = memoized(function A (n) {
    runCnt+=1;
  if (n == 1) return 1;
  return n * memoizedFactorial(n - 1);
});

console.log(memoizedFactorial(3), runCnt);
console.log(memoizedFactorial(5), runCnt);
