// Single line comment

/*
Multiple line
Comments
*/

// Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
function loadEventListeners() {
	// DOM load event
	document.addEventListener("DOMContentLoaded", getTasks);
	// Add task event
	form.addEventListener("submit", addTask);
	// Remove task event
	taskList.addEventListener("click", removeTask);
	// Clear Task Events
	clearBtn.addEventListener("click", clearTasks);
	// Filter Task Events
	filter.addEventListener("keyup", filterTasks);
}

// Load all event listeners
loadEventListeners();

// Load tasks to dom
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement("li");
		// Add class
		li.className = "collection-item";
		// Create the text node
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement("a");
		link.className = "delete-item secondary-content";

		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append link to li
		li.appendChild(link);
		// Append the li to the ul
		taskList.appendChild(li);
	});

	console.log(tasks);
}

// Add Task
function addTask(e) {
	e.preventDefault();

	if (taskInput.value === "") {
		alert("Add a task");
	} else {
		// Create li element
		const li = document.createElement("li");
		// Add class
		li.className = "collection-item";
		// Create the text node
		li.appendChild(document.createTextNode(taskInput.value));
		// Create new link element
		const link = document.createElement("a");
		link.className = "delete-item secondary-content";

		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append link to li
		li.appendChild(link);
		// Append the li to the ul
		taskList.appendChild(li);
		// Store task in local storage
		storeTaskInLocalStorage(taskInput.value);
		// Clear input
		taskInput.value = "";
	}
}

// Function store task to local storage

function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();

			// Remove from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove task from Local storage
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks

function clearTasks() {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear tasks from local storage
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter Tasks

function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".collection-item").forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = "block";
		} else {
			task.style.display = "none";
		}
	});
}
