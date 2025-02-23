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

function addTodo() {
  if (input.value.trim() != "") {
    let newTodo = document.createElement("li");
    newTodo.setAttribute("id", `todo-${listTodo.children.length + 1}`);
    listTodo.appendChild(newTodo);

    let spanText = document.createElement("span");
    spanText.textContent = input.value;
    newTodo.appendChild(spanText);

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
      alert(`${newTodo.id} removed`)
    });

    doneBtn.addEventListener("click", function () {
      spanText.classList.toggle("done");
    });

    input.value = "";
    input.focus();
  }
}
