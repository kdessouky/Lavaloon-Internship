const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filters button");

let tasks = [];


addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = { id: Date.now(), text, completed: false };
  tasks.push(task);
  taskInput.value = "";
  renderTasks();
});

// 2. Task Display
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filtered = tasks;
  if (filter === "completed") filtered = tasks.filter(t => t.completed);
  if (filter === "incomplete") filtered = tasks.filter(t => !t.completed);

  filtered.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    // 6. Task Editing
    span.addEventListener("click", () => editTask(task.id));

    // 3. Mark as Completed + 4. Delete Task
    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => toggleComplete(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}


function toggleComplete(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
}


function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}


function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters button.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks(btn.dataset.filter);
  });
});


renderTasks();
