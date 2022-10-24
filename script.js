"use strict";
// initialize shorthands for query selector
const $ = document.querySelector.bind(document);

// grab all necessary dom elements
const form = $("#form");
const lists = $("#lists");
const input = $("#input");

//Define todo object
class Todo {
  constructor(id, todo, completed) {
    this.id = id;
    this.todo = todo;
    this.completed = completed;
  }

  renderTodo() {
    const checked = this.completed ? "checked" : null;
    const styleChecked = this.completed ? "checked" : "";
    return `
              <div class="todo" data-id = ${this.id}>
                <input type="checkbox" class="checkbox" ${checked}>
                <p class="${styleChecked}">${this.todo}</p>
                <span class="remove" >🗑️</span>
              </div>
          `;
  }
}

//Define the App
class TodoApp {
  /** Global todo list array */
  todoLst = [];

  setLocalStorage(todoLst) {
    let storage = localStorage.setItem("todoLst", JSON.stringify(todoLst));
    return storage;
  }

  removeTodo(id) {
    this.todoLst = this.todoLst.filter((item) => item.id !== +id);
    this.setLocalStorage(this.todoLst);
    this.renderTodoList();
  }

  renderTodoList() {
    console.log(`here dis list:${this.todoLst.length}`);
    let displayData = this.todoLst.map((item) => {
      return item.renderTodo();
    });
    lists.innerHTML = displayData.join(" ");
  }

  addTodo(todo) {
    this.todoLst = [...this.todoLst, todo];
    this.renderTodoList();
    this.setLocalStorage(this.todoLst);
  }

  static clearInput() {
    input.value = "";
  }
}

/**  create the App instance */
const app = new TodoApp();

/**  add the event listeners */
/**-------------------------- */
// add todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Date.now();
  const todo = new Todo(id, input.value, false);
  app.addTodo(todo);
  TodoApp.clearInput();
});

lists.addEventListener("click", (e) => {
  // remove todo
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();
    let id = e.target.parentElement.dataset.id;
    app.removeTodo(id);
  }

  //check if the event is on checkbox and is it checked?
  if (e.target.type === "checkbox") {
    // toggle the state
    let id2 = e.target.parentElement.dataset.id;
    console.log(id2);
    app.todoLst.forEach((item) => {
      if (item.id == id2) {
        item.completed = !item.completed;
      }
    });
    app.renderTodoList();
  }
});
