let input = document.getElementById("input");
let btn = document.getElementById("btn");
let listTodo = document.getElementById("list");

let todos = [];

btn.addEventListener("click", addOrUpdateTodo);

input.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    addOrUpdateTodo();
  }
  e.preventDefault();
});

function addOrUpdateTodo() {
  let todoText = input.value.trim();

  if (todoText !== "") {
    createTodoElement(todoText);
    addTodosToStorage(todoText);
    input.value = "";
    input.focus();
  }
}

function createTodoElement(todoText) {
  let newTodo = document.createElement("li");
  listTodo.appendChild(newTodo);

  let spanText = document.createElement("span");
  spanText.textContent = todoText;
  newTodo.appendChild(spanText);

  let btns = document.createElement("div");
  btns.classList.add("btns");

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  btns.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("del-btn");
  btns.appendChild(deleteBtn);

  let doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.classList.add("done-btn");
  btns.appendChild(doneBtn);

  newTodo.appendChild(btns);

  deleteBtn.addEventListener("click", function () {
    removeFromStorage(spanText.textContent);
    newTodo.remove();
  });

  doneBtn.addEventListener("click", function () {
    spanText.classList.toggle("done");
  });

  editBtn.addEventListener("click", function () {
    let inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = spanText.textContent;
    inputEdit.classList.add("edit-input");
    newTodo.replaceChild(inputEdit, spanText);
    inputEdit.focus();

    inputEdit.addEventListener("blur", function () {
      updateTodo(spanText.textContent, inputEdit.value, spanText);
      newTodo.replaceChild(spanText, inputEdit);
    });

    inputEdit.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        updateTodo(spanText.textContent, inputEdit.value, spanText);
        newTodo.replaceChild(spanText, inputEdit);
      }
    });
  });
}

function updateTodo(oldText, newText, spanText) {
  checkStorage();
  let index = todos.indexOf(oldText);
  if (index !== -1) {
    todos[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
    spanText.textContent = newText;
  }
}

function addTodosToStorage(newTodo) {
  checkStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeFromStorage(todoText) {
  checkStorage();
  let index = todos.indexOf(todoText);
  if (index !== -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function checkStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function loadTodos() {
  checkStorage();
  todos.forEach((todo) => {
    createTodoElement(todo);
  });
}

window.addEventListener("load", loadTodos);