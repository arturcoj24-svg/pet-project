const taskList = document.querySelector('#taskList');
const taskCount = document.querySelector('#taskCount');

export function renderTasks(tasks, filter) {
  taskList.textContent = '';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  filteredTasks.forEach(task => {
    const taskElement = createTaskElement(task);

    taskList.appendChild(taskElement);
  });

  updateTaskCount(tasks);
}

function createTaskElement(task) {
  const li = document.createElement('li');

  li.classList.add('task');

  if (task.completed) {
    li.classList.add('completed');
  }

  li.dataset.id = task.id;

  const checkbox = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('task-checkbox');

  const text = document.createElement('span');

  text.textContent = task.text;
  text.classList.add('task-text');

  const deleteButton = document.createElement('button');

  deleteButton.textContent = 'Удалить';
  deleteButton.classList.add('delete-button');

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteButton);

  return li;
}

function updateTaskCount(tasks) {
  const activeTasks = tasks.filter(task => !task.completed);

  taskCount.textContent = activeTasks.length;
}