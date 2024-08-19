let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

// // param1 是要控制的對象
// // param2 是duration
// // param3 是控制對象的原始狀態
// // param4 是控制對象的動畫結束後的狀態
// // param5 設定提早開始跑
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2" // 提早1.2s
  )
  .fromTo(
    animation,
    0.3,
    { opacity: "1" },
    { opacity: "0", ease: Power2.ease }
  );

window.setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// Disable the Enter key of the web
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// Prevent buttons inside the form from submitting form
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// After changing the credits, update the GPA
let allCredits = document.querySelectorAll(".class-credit");
allCredits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

// Change the corrsponding color of select by selecting the options inside
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    // e.target is the <select> tag.
    changeColor(e.target);
  });
});

function changeColor(target) {
  switch (target.value) {
    case "A":
    case "A-":
      target.style.backgroundColor = "lightgreen";
      target.style.color = "black";
      break;

    case "B+":
    case "B":
    case "B-":
      target.style.backgroundColor = "yellow";
      target.style.color = "black";
      break;

    case "C+":
    case "C":
    case "C-":
      target.style.backgroundColor = "orange";
      target.style.color = "black";
      break;

    case "D+":
    case "D":
    case "D-":
      target.style.backgroundColor = "red";
      target.style.color = "black";
      break;

    default:
      target.style.backgroundColor = "gray";
      target.style.color = "white";
      break;
  }
}

// Convert Grades to scores
function converter(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;

    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;

  for (let i = 0; i < formLength; i++) {
    creditSum += credits[i].valueAsNumber;
    sum += converter(selects[i].value) * credits[i].valueAsNumber;
  }

  // round to at most 2 decimal places
  let result = creditSum == 0 ? (0.0).toFixed(2) : (sum / creditSum).toFixed(2);

  // Update the GPA
  document.getElementById("result-gpa").innerText = result;
}

// make new form
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  // make five elements inside the grader div
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.classList.add("class-type");
  // newInput1.setAttribute("class", "class-type"); is ok
  newInput1.setAttribute("list", "opt");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  newInput3.setAttribute("value", "0");

  // Because the above allCredits are NodeList, which is static,
  // When we add a new credit, it doesn't have a event listener, since it won't be added to NodeList.
  // We need to add the functions manually.
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  // Because the above allSelects are NodeList, which is static
  // When we add a new select tag, it doesn't have a event listener, since it won't be added to NodeList.
  // We need to add the functions manually.
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  // make trash bin
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);
  // 1. Prevent submitting the website while clicked.
  // 2. Apply remove animation
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";

    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  // append inputs, select and trash bin as child of newDiv
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  // Since div is the child of form and form is child of .all-inputs div.
  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);

  // Apply animation of revealing a new form
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    let form = trash.parentElement.parentElement;
    form.classList.add("remove");
    form.addEventListener("transitionend", () => {
      form.remove();
      setGPA();
    });
  });
});

// Sorting Algorithm
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // Big to small
});

btn2.addEventListener("click", () => {
  handleSorting("ascending"); // Small to big
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    // children 給 HTMLCollection
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value; // class credit (String type!!!!)
    let class_grade = graders[i].children[3].value; // class grade

    if (class_grade != "") {
      let class_object = {
        class_name: class_name,
        class_number: class_number,
        class_credit: class_credit,
        class_grade: class_grade,
        class_grade_number: converter(class_grade),
      };
      objectArray.push(class_object);
    }
  }

  // After getting objectArray, we change the grade string to number (using converter()).
  //   for (let i = 0; i < objectArray.length; i++) {
  //     objectArray[i].class_grade_number = converter(objectArray[i].class_grade);
  //   }
  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }

  // Basic on objectArray, update the web page.
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
<div class="grader">
    <input
    type="text"
    placeholder="class category"
    class="class-type"
    list="opt"
    value=${objectArray[i].class_name}
    /><!--
    --><input
    type="text"
    placeholder="class number"
    class="class-number"
    value=${objectArray[i].class_number}
    /><!--
    --><input
    type="number"
    placeholder="credits"
    min="0"
    max="6"
    class="class-credit"
    value=${objectArray[i].class_credit}
    /><!--
    --><select name="select" class="select">
    <option value=""></option>
    <option value="A">A</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B">B</option>
    <option value="B-">B-</option>
    <option value="C+">C+</option>
    <option value="C">C</option>
    <option value="C-">C-</option>
    <option value="D+">D+</option>
    <option value="D">D</option>
    <option value="D-">D-</option>
    <option value="F">F</option></select
    ><!--
    --><button class="trash-button">
    <i class="fas fa-trash"></i>
    </button>
</div>
</form>`;
  }
  // Select need to be changed by JS, cannot change by applying value above.
  graders = document.querySelectorAll("div.grader"); // allInput is NodeList, need to reselect.
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // Select color event listener (as soon as we remake the form)
  // Select color event listener (when change after remaking the form)
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // Credit event listener
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // trash bin
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";

      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  //
  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }
  // Remaining part
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  } else if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
