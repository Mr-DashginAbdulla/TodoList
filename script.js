let input = document.getElementById("input");
let btn = document.getElementById("btn");
let listTodo = document.getElementById("list");

btn.addEventListener("click", addTodo);

input.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    addTodo();
  }
  e.preventDefault();
});

// let array = [];

// if (localStorage.getItem("tasks") !== null) {
//   array = localStorage.getItem("tasks");
// }
function addTodo() {
  if (input.value.trim() != "") {
    let newTodo = document.createElement("li");
    newTodo.textContent = input.value;
    newTodo.setAttribute("id", `todo-${listTodo.children.length + 1}`);
    listTodo.appendChild(newTodo);

    let btns = document.createElement("div");
    btns.classList.add("btns");

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("del-btn");
    btns.appendChild(deleteBtn);

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.classList.add("done-btn");
    btns.appendChild(doneBtn);

    newTodo.appendChild(btns);

    deleteBtn.addEventListener("click", function (e) {
      newTodo.remove();
    });

    doneBtn.addEventListener("click", function () {
      newTodo.classList.toggle("done");
    });

    input.value = "";
    input.focus();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", tasks.map(t => `${t.text}|${t.completed}`).join(";"));
}

function loadTodos() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = storedTasks.split(";").map(item => {
      let [text, completed] = item.split("|");
      return { text, completed: completed === "true" };
    });
    tasks.forEach(createTodoElement);
  }
}

// Local storage.
