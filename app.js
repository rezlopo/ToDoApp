//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter");
const btns = filterOption.getElementsByClassName("btn");
const current = document.getElementsByClassName("active");

//EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
	//Prevent from submitting
	event.preventDefault();
	//ToDo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create li
	const newTodo = document.createElement("li");
	newTodo.classList.add("todo-item");
	newTodo.innerText = todoInput.value;

	todoDiv.appendChild(newTodo);

	//Add todo to local storage
	saveLocalTodos(todoInput.value);

	//Check mark btn
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("completed-btn");
	todoDiv.appendChild(completedButton);

	//Check Trash btn
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	//Append to list
	todoList.appendChild(todoDiv);

	//Clear todo input value
	todoInput.value = "";
}

//Delete todo
function deleteCheck(event) {
	const item = event.target;
	//Delete todo
	if (item.classList.contains("trash-btn")) {
		const todo = item.parentElement;

		//Delete animation
		item.parentElement.classList.add("fall");
		removeLocalTodos(todo);
		item.parentElement.addEventListener("transitionend", function () {
			item.parentElement.remove();
		});
	}
	//Delete todo
	if (item.classList.contains("completed-btn")) {
		item.parentElement.classList.toggle("completed");
	}
}

//filter Todo
function filterTodo(event) {
	const todos = todoList.childNodes;
	console.log(event.target.classList);

	todos.forEach(function (todo) {
		switch (event.target.classList[1]) {
			case "allFilter":
				todo.style.display = "flex";

				break;
			case "completedFilter":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompletedFilter":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

//Active button
for (let i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}
// Local storage
function saveLocalTodos(todo) {
	//Check
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}
// Aper todos from local storage
function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		//ToDo DIV
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create li
		const newTodo = document.createElement("li");
		newTodo.classList.add("todo-item");
		newTodo.innerText = todo;

		todoDiv.appendChild(newTodo);

		//Check mark btn
		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("completed-btn");
		todoDiv.appendChild(completedButton);

		//Check Trash btn
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);

		//Append to list
		todoList.appendChild(todoDiv);
	});
}
//Remove local todos
function removeLocalTodos(todo) {
	//Check
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
