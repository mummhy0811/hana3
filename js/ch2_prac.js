/*
for문을 이용하여 다음과 같이 정확한 숫자를 출력하는 코드를 작성하시오.
for(let i = 0.1; i < 1; i = i + 0.1) console.log(i);  // right??
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
1 
*/
for(let i = 0.1; i < 1; i = i + 0.1) console.log(Number(i.toFixed(1))); //console.log(+i.toFixed(1)); 코드와 동일
console.log('---------');
/*
다음과 같이 올바른 더하기 연산을 하는 addPoints 함수를 작성하시오.
(단, 소숫점 자리수는 긴쪽에 맞춘다)

0.21354 + 0.1   // 0.31354000000000004
0.14 + 0.28     // 0.42000000000000004
0.34 + 0.226    // 0.5660000000000001

addPoints(0.21354, 0.1)   // 0.31354
addPoints(0.14, 0.28)     // 0.42
addPoints(0.34, 0.226)    // 0.566
*/
function addPoints(a, b){
    const len_a=String(a).split('.')[1].length;
    const len_b=String(b).split('.')[1].length;
    const len = Math.max(len_a, len_b);
    return +(a+b).toFixed(len+2).substring(0, len+2);
}
console.log(addPoints(0.21354, 0.1));
console.log(addPoints(0.14, 0.28) );
console.log(addPoints(0.34, 0.226));
console.log('--------');
/*
다음 user 객체에서 passwd 프로퍼티를 제외한 데이터를 userInfo 라는 변수에 할당하시오.

const user = {id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul'}
const <이 부분을 작성하시오>
console.log(userInfo); 
// 출력결과: {id: 1, name: 'Hong', addr: 'Seoul'}

*/
const user = {id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul'};
const {passwd, ...userInfo}=user;
console.log(userInfo); 
console.log('---------');

/*
다음 arr에서 3개의 id를 id1, id2, id3로 할당하시오. 

const arr = [[{id: 1}], [{id:2}, {id: 3}]]
const <이 부분을 작성하시오>
console.log(id1, id2, id3); 
// 출력결과: 1 2 3

*/
const arr = [[{id: 1}], [{id:2}, {id: 3}]];
const [[{id:id1}, ],  [{id:id2}, {id:id3}]]= arr; 
console.log(id1, id2, id3); 

