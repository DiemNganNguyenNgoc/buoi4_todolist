// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const statusSelect = document.getElementById('statusSelect');
    const taskList = document.getElementById('taskList');
    const categoryForm = document.getElementById('categoryForm');
    const categoryInput = document.getElementById('categoryInput');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let categories = JSON.parse(localStorage.getItem('categories')) || [];

    // Load categories
    function loadCategories() {
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="task">
                    <span>${task.text}</span>
                    <span class="status">${task.category} - ${task.status}</span>
                </div>
                <button onclick="deleteTask('${task.id}')">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Save categories to localStorage
    function saveCategories() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    // Add task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = {
            id: Date.now().toString(),
            text: taskInput.value,
            category: categorySelect.value,
            status: statusSelect.value
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    // Add category
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = categoryInput.value;
        if (categories.includes(category)) {
            alert('Category already exists!');
            return;
        }
        categories.push(category);
        saveCategories();
        loadCategories();
        categoryForm.reset();
    });

    // Delete task
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    // Initial load
    loadCategories();
    renderTasks();
    //localStorage.clear();
});
