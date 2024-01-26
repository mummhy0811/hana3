//bash에 nodemon hello.js -> watch상태

//val는 가변 const는 불변 var는 모르는 것. var 가능하면 쓰지말것
var userName="hong"; 
var age; //declare + define  정의(defined): 메모리에 할당됐다!
console.log("🚀 ~ age:", age) // undefined로 define됨. 다른 언어는 이렇게 쓰면 오류난다
age=33; 
console.log("🚀 ~ age:", age)
console.log(`Hello ${userName}`); 

//primitive(call-by-value) vs object(call-by-reference)
var a="a"; //string(primitive) -> stack에 실제 값 저장
var arr=[1]; //array(object) -> stack에 주소 저장(시작 위치)