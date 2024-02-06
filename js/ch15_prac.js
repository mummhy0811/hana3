const users = [
  { id: 1, name: "홍길동", tel: "01088889991", addr: "서울" },
  { id: 2, name: "김길동", tel: "01088889992", addr: "부산" },
  { id: 3, name: "이길동", tel: "01088889993", addr: "서울" },
  { id: 4, name: "박길동", tel: "01088889994", addr: "서울" },
];

const table = document.getElementById("table");

for (let i = 0; i < users.length; i++) {
  const tr = document.createElement("tr");
  tr.id = i;
  for (let info in users[i]) {
    const td = document.createElement("td");
    td.innerText = users[i][info];
    tr.append(td);
  }
  

  
  table.append(tr);
}
const tr = document.createElement("tr");
tr.id = "delete";
const td = document.createElement("td");
td.colSpan = 4;
const btn = document.createElement("button");
btn.addEventListener("click", deleteRow);
td.append(btn);
btn.innerText = "삭제";
tr.append(td);
table.append(tr);

function deleteRow() {
  var table = document.getElementById("table");
  var lastRow = table.getElementsByTagName("tr").length - 2;
  if(lastRow>0)table.deleteRow(lastRow);
  
}
