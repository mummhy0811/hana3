const arr2=[1, 2, 3, 4, 5];
//ex1) [2,3]을 추출
console.log(arr2.slice(1, 3));
// ex2) [3]부터 모두 다 추출
console.log(arr2.slice(2));
// ex3) [2,3,4] 제거하기
console.log(arr2.splice(1, 3));
// ex4) 복원하기
arr2.splice(1, 0, 2, 3, 4)
console.log(arr2);
// ex5) [3] 부터 끝까지 제거하기
arr2.splice(2);
console.log(arr2);
// ex6) 복원하기
arr2.splice(2, 0, 3, 4, 5)
console.log(arr2);
// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
// arr2.splice(2, 1, 'X', 'Y', 'Z')
// console.log(arr2);
// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오. ['X', 'Y', 'Z']
//동일 코드
const arr = arr2.slice(0,2).concat(...['X', 'Y', 'Z']).concat(arr2.slice(3));
console.log(arr);
const arr3 = [...arr2.slice(0,2),'X', 'Y', 'Z',...arr2.slice(3)];
console.log(arr3);