const arr = [100, 200, 300, 400, 500, 600, 700];
// 1. for-in문을 사용하여 배열의 인덱스를 출력하시오.
console.log('1-----------');
for(let k in arr){
    console.log(k);
}
console.log('2-----------');
//2. for-in문을 사용하여 배열의 원소(값)를 출력하시오.
for(let k in arr){
    console.log(arr[k]);
}

const obj = { name: 'lim', addr: 'Yongsan', level: 1, role: 9, receive: false }
console.log('3-----------');
// 3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
for(let k in obj){
    console.log(k);
}
console.log('4-----------');
// 4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
for(let k in obj){
    console.log(obj[k]);
}
// 5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
console.log('5-----------');
for(let k of Object.keys(obj)){
    console.log(k);
}
console.log('6-----------');
// 6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오.
Object.defineProperty(obj, 'level', {enumerable:false});

console.log('7-----------');
// 7. role 프로퍼티는 읽기전용으로 설정하시오.
Object.defineProperty(obj, 'role', {writable:false});

console.log('8-----------');
const array = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]];
function makeObjectFromArray(array){
    const arrToObj = {};
    for(let k of array){
        [i, ...v]=k;
        arrToObj[i]=v;  
    }
    return arrToObj;
}

const object=makeObjectFromArray(array);
console.log(object);
console.log('9-----------');
function makeArrayFromObject(obj){
    const objToArr=[];
    for(let k in obj){
        objToArr.push([k, ...obj[k]]);
    }
    return objToArr;
}
console.log(makeArrayFromObject(object));

console.log('10-----------');
const kim = {nid: 3, nm: 'Hong', addr: 'Pusan'};
function copyobj(obj){
    const retObj={};
    for(const k in obj){
        retObj[k]=obj[k];
    }
    return retObj;
}
const newKim = copyobj(kim);
console.log(newKim);
newKim.addr = 'Daegu';
console.log(kim.addr !== newKim.addr); 

