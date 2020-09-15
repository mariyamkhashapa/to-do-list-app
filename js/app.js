// لتحديد العناصر 
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// تحديد الانواع
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// متغيرات
let LIST, id;

// تخزين
let data = localStorage.getItem("TODO");

// نشوف في عنصر ولا فاضي
if (data) {
  LIST = JSON.parse(data);
  // set the id to the last one in the list
  id = LIST.length; 
   // تظهر للمستخدم 
  loadList(LIST);
} else {
  // لو العنصر مش فاضي ياخد اي دي 0
  LIST = [];
  id = 0;
}

// اظهار العناصر للمستخدم
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// نمسح العناصر من عند المستخدم
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
})

// نظهر تاريخ اليوم
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {

  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

// نخلي لما يضغط علي انتر العنصر يتضاف
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // لو العنصر فاضي مش هيتضاف
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      // اضافه العناصر للمستخدم 
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

// نكمل القايمه
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// نمسح العنصر المطلوب
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener("click", function (event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // اضافه للمخزن
  localStorage.setItem("TODO", JSON.stringify(LIST));
})