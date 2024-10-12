// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to add a task to the list
    function addTask(taskText, saveToLocalStorage = true) {
        // Create a new list item for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-item');  // Add class to the task item

        // Create a button to remove the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // Add class to the remove button

        // Add click event listener to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append remove button to the task item and task item to the list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // If we want to save the task (when it's a new task), update local storage
        if (saveToLocalStorage) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);  // Add new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  // Save updated array back to local storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);  // Filter out the task to be removed
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Update local storage with new array
    }

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));  // Add each task without saving to Local Storage again
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();  // Get input value and trim whitespace

        // Check if task is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTask(taskText);  // Add task and save to Local Storage
    });

    // Allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();

            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }

            addTask(taskText);  // Add task and save to Local Storage
        }
    });
});
