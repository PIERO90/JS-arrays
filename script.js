let toDoList = [
  { id: 1, description: "Ir al supermercado", done: false },
  { id: 2, description: "Estudiar", done: false },
  { id: 3, description: "Pasear al perro", done: false },
];

function updateSummary() {
  let pendingTasks = toDoList.filter((task) => !task.done).length;
  let summaryElement = document.getElementById("summary");
  summaryElement.textContent = `Resumen: ${pendingTasks} tarea${pendingTasks !== 1 ? "s" : ""} pendiente${pendingTasks !== 1 ? "s" : ""}`;
}

function addTask() {
  let newTaskText = document.getElementById("new-task").value;
  if (newTaskText.trim() !== "") {
    let newId = toDoList.length + 1;
    toDoList.push({ id: newId, description: newTaskText, done: false });
    displayTasks();
    updateSummary();
    document.getElementById("new-task").value = "";
  }
}

function markAsDone(id) {
  let task = toDoList.find((task) => task.id === id);
  if (task) {
    task.done = true;
    displayTasks();
    updateSummary();
  }
}

function deleteTask(id) {
  let taskIndex = toDoList.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    toDoList.splice(taskIndex, 1);
    displayTasks();
    updateSummary();
  }
}

function displayTasks() {
  let taskListElement = document.getElementById("taskList");
  taskListElement.innerHTML = "";

  for (const task of toDoList) {
    let listItem = document.createElement("li");
    listItem.textContent = task.description;

    if (task.done) {
      listItem.style.textDecoration = "line-through";
      listItem.textContent += "";
    }

    let markDoneButton = document.createElement("button");
    markDoneButton.textContent = "Realizado";
    markDoneButton.addEventListener("click", function () {
      markAsDone(task.id);
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    listItem.appendChild(markDoneButton);
    listItem.appendChild(deleteButton);
    taskListElement.appendChild(listItem);
  }
}

// Add event listener for the "Agregar" button
document.getElementById("add-button").addEventListener("click", addTask);

// Initialize the summary and display initial tasks
updateSummary();
displayTasks();
