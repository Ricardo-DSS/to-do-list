let list = document.getElementById("task-list");
let newTask = document.getElementById("add-task-button");
let task = document.getElementById("input-task");
let delButtons = list.querySelectorAll(".delete-btn");
let checkbox = list.querySelectorAll(".check");

// Função para salvar as tarefas no localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    list.querySelectorAll("li").forEach(li => {
        let taskText = li.querySelector(".task").textContent;
        let isChecked = li.querySelector(".check").checked;
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let item = document.createElement("li");
        let input = document.createElement("input");
        let span = document.createElement("span");
        let button = document.createElement("button");

        span.textContent = task.text;
        span.className = "task";
        input.type = "checkbox";
        input.className = "check";
        input.checked = task.checked;
        button.className = "delete-btn";

        item.appendChild(input);
        item.appendChild(span);
        item.appendChild(button);
        list.appendChild(item);

        button.addEventListener("click", deleteTask);
        input.addEventListener("change", riskTask);
        riskTask({ currentTarget: input }); // Atualizar o estilo das tarefas carregadas
    });
}

// Carregar as tarefas do localStorage quando a página carregar
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

for (let check of checkbox) {
    check.addEventListener("change", riskTask);
}

for (let button of delButtons) {
    button.addEventListener("click", deleteTask);
}

newTask.addEventListener("click", registerNewTask);

function registerNewTask() {
    if (task.value === "") {
        console.log("There is no task");
    } else {
        let item = document.createElement("li");
        let input = document.createElement("input");
        let span = document.createElement("span");
        let button = document.createElement("button");

        span.textContent = task.value;
        span.className = "task";
        input.type = "checkbox";
        input.className = "check";
        button.className = "delete-btn";

        item.appendChild(input);
        item.appendChild(span);
        item.appendChild(button);
        list.appendChild(item);

        task.value = "";

        button.addEventListener("click", deleteTask);
        input.addEventListener("change", riskTask);

        saveTasksToLocalStorage();
    }
}

function deleteTask(event) {
    let li = event.target.parentElement;
    li.remove();
    saveTasksToLocalStorage();
}

function riskTask(event) {
    let span = event.currentTarget.nextElementSibling;
    if (event.currentTarget.checked) {
        span.style.textDecoration = "line-through";
    } else {
        span.style.textDecoration = "none";
    }
    saveTasksToLocalStorage();
}