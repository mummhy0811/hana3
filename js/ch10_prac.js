const hrTeam = {id: 1, dname: '인사팀'};
const devTeam = {id: 2, dname: '개발팀'};
const depts = [ hrTeam, devTeam ];

const hong = {id: 1, name: 'Hong', dept: 1};
const kim = {id: 2, name: 'Kim', dept: 2};
const emps = [ hong, kim, {id:3, name: 'Park', dept: 2}, {id: 4, name: 'Choi', dept: 2} ];

const deptMap = new Map();
for(let l of depts){
    deptMap.set(l.id, l);
}

const empMap = new Map();
for(let l of emps){
    empMap.set(l.id, l);
}
const empDept = new Map();
for(let emp of empMap.values()){
    empDept.set(emp,deptMap.get(emp.dept))
}

console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)
console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }
console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }
console.log(empDept.get(kim).dname); // '개발팀'
// 개발팀 직원 목록 출력 ⇒ Kim, Park, Choi


