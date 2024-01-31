/*
함수를 한번만 실행하게 하는 once 함수를 작성하시오.
ex)
const fn = once((x, y) => `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`);
console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined

*/

function once(f) {
  let didRun = false;
  return function (...args) {
    if (didRun) return;
    didRun = true;
    return f.apply(this, args);
    // return (didRun=true),  f.apply(this, args); //동일 코드
  };
}

function f(x, y) {
  return `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!  ${this.id}`;
}

const thisObj1 = { id: 100 };
const thisObj2 = { id: 200 };
const fn = once(f);
console.log(fn.call(thisObj1, 1, 6));
console.log(fn(1, 6));
