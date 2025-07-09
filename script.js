const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm";

    const taskContainer = document.createElement("div");
    taskContainer.className = "flex-1";

    const taskText = document.createElement("span");
    taskText.textContent = task;
    taskText.className = "text-gray-800";
    taskContainer.appendChild(taskText);

    const inputField = document.createElement("input");
    inputField.value = task;
    inputField.className =
      "hidden w-full px-2 py-1 border rounded-md text-sm text-gray-700";
    taskContainer.appendChild(inputField);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "space-x-2 flex-shrink-0";

    // 🖊 Edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "🖊";
    editBtn.title = "Edit";
    editBtn.className =
      "text-yellow-500 text-lg hover:text-yellow-600 transition";

    // 💾 Save button
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "💾";
    saveBtn.title = "Save";
    saveBtn.className =
      "hidden text-green-500 text-lg hover:text-green-600 transition";

    // ❌ Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.title = "Delete";
    deleteBtn.className =
      "text-red-500 text-lg hover:text-red-600 transition";

    // Handle Edit
    editBtn.addEventListener("click", () => {
      taskText.classList.add("hidden");
      inputField.classList.remove("hidden");
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      inputField.focus();
    });

    // Handle Save
    saveBtn.addEventListener("click", () => {
      const updatedValue = inputField.value.trim();
      if (updatedValue !== "") {
        tasks[index] = updatedValue;
        updateStorageAndRender();
      }
    });

    // Enter key to save
    inputField.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveBtn.click();
      }
    });

    // Handle Delete
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      updateStorageAndRender();
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(saveBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(taskContainer);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });
}

function updateStorageAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();
  if (task !== "") {
    tasks.push(task);
    updateStorageAndRender();
    input.value = "";
  }
});

renderTasks();
