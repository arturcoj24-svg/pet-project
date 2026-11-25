import { saveTasks, loadTasks } from './storage.js';
import { renderTasks } from './ui.js';

const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const filterButtons = document.querySelectorAll('.filter-button');

let tasks = loadTasks();

let currentFilter = 'all';

renderTasks(tasks, currentFilter);

taskForm.addEventListener('submit', event => {
  event.preventDefault();

  const text = taskInput.value.trim();

  if (!text) {
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);

  taskInput.value = '';
});

taskList.addEventListener('change', event => {
  if (!event.target.classList.contains('task-checkbox')) {
    return;
  }

  const taskElement = event.target.closest('.task');

  const taskId = Number(taskElement.dataset.id);

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return;
  }

  task.completed = event.target.checked;

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);
});

taskList.addEventListener('click', event => {
  if (!event.target.classList.contains('delete-button')) {
    return;
  }

  const taskElement = event.target.closest('.task');

  const taskId = Number(taskElement.dataset.id);

  tasks = tasks.filter(task => task.id !== taskId);

  saveTasks(tasks);

  renderTasks(tasks, currentFilter);
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(button => {
      button.classList.remove('active');
    });

    button.classList.add('active');

    renderTasks(tasks, currentFilter);
  });
});