function once(f){
  let didRun = false;
  return function (...args){
    if(!didRun) {
      didRun=true;
      //return f.call(this, ...args);
      return f.apply(this, args);
    }
    return;
  };
}

function f( x, y){
  return `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!  ${this.id}`;
} 

const thisObj1 = { id: 100 };
const thisObj2 = { id: 200 };
const fn = once(f);
console.log(fn.call(thisObj1, 1, 6)); 
console.log(fn(1,6));

