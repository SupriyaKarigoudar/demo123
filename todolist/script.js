
// ACCESS HTML ELEMENTS

let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let pendingTasks = document.getElementById("pendingTasks");

let filterButtons = document.querySelectorAll(".filter-btn");


// STORE TASKS IN LOCAL STORAGE

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// CREATE TASK

addBtn.addEventListener("click", function() {

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: task,
        completed: false
    });

    taskInput.value = "";

    saveTasks();

});


// ENTER KEY FUNCTIONALITY

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});


// READ AND DISPLAY TASKS

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        // FILTER LOGIC

        if (currentFilter === "pending" && task.completed) {
            return;
        }

        if (currentFilter === "completed" && !task.completed) {
            return;
        }

        let li = document.createElement("li");

        // TASK TEXT

        let span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        // COMPLETE BUTTON

        let completeBtn = document.createElement("button");

        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;
            saveTasks();

        });

        // EDIT BUTTON

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {

            let updatedTask = prompt("Edit your task:", task.name);

            if (updatedTask !== null && updatedTask.trim() !== "") {

                tasks[index].name = updatedTask.trim();
                saveTasks();

            }

        });

        // DELETE BUTTON

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);
            saveTasks();

        });

        // ADD ELEMENTS

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounters();

}


// UPDATE TASK COUNTERS

function updateCounters() {

    totalTasks.textContent = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed === true;
    });

    completedTasks.textContent = completed.length;

    pendingTasks.textContent = tasks.length - completed.length;

}


// SAVE TASKS

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

}


// TASK FILTER BUTTONS

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayTasks();

    });

});


// INITIAL DISPLAY

displayTasks();
