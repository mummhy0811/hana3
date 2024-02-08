const div2 = document.createElement("div");
div2.classList.add("hide");
div2.id = "div2";
div2.innerText = "선택한 과목";
document.body.append(div2);

div2.style.backgroundColor = "green";
div2.style.color = "white";

function getCheckboxValue() {
    const query = 'input[id="lang"]:checked';
  const selectedEls = document.querySelectorAll(query);

  let result = "";

  selectedEls.forEach((el) => {
    result += el.value + " \n";
  });
  if(selectedEls.length==0){
    div2.classList.add("hide");
    div2.classList.remove("show");
  }else{
    div2.classList.add("show");
    div2.classList.remove("hide");
  }
  document.getElementById("div2").innerText = "선택한 과목\n"+result;
}


