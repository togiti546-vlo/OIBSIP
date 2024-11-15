let pendingTasks = [];  // Store the pending tasks
let completedTasks = [];  // Store the completed tasks

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date().toLocaleString(),
  };

  // Add the task to the pending list
  pendingTasks.push(task);
  renderTasks();
  taskInput.value = ""; // Clear the input field
}

// Function to mark a task as complete
function completeTask(taskId) {
  const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
  if (taskIndex > -1) {
    const task = pendingTasks.splice(taskIndex, 1)[0];
    task.completed = true;
    completedTasks.push(task);
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(taskId, isCompleted = false) {
  if (isCompleted) {
    completedTasks = completedTasks.filter(task => task.id !== taskId);
  } else {
    pendingTasks = pendingTasks.filter(task => task.id !== taskId);
  }
  renderTasks();
}

// Function to edit a task
function editTask(taskId) {
  const task = [...pendingTasks, ...completedTasks].find(task => task.id === taskId);
  const newText = prompt("Edit your task:", task.text);
  if (newText && newText.trim() !== "") {
    task.text = newText;
    renderTasks();
  }
}

// Render the tasks in the respective sections
function renderTasks() {
  const pendingList = document.getElementById("pending-list");
  const completedList = document.getElementById("completed-list");

  // Clear the existing lists
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  // Render Pending Tasks
  pendingTasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      ${task.text} <span class="task-time">[Added: ${task.createdAt}]</span>
      <button class="complete" onclick="completeTask(${task.id})">Complete</button>
      <button class="edit" onclick="editTask(${task.id})">Edit</button>
      <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
    `;
    pendingList.appendChild(taskItem);
  });

  // Render Completed Tasks
  completedTasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("completed");
    taskItem.innerHTML = `
      ${task.text} <span class="task-time">[Completed: ${task.createdAt}]</span>
      <button class="delete" onclick="deleteTask(${task.id}, true)">Delete</button>
    `;
    completedList.appendChild(taskItem);
  });
}
