const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')
const tasksContainer = document.querySelector('.tasks-container')

const validateInput = () => inputElement.value.trim().length > 0

// adicionar nova tarefa
const handleAddTask = () => {
  const inputIsValid = validateInput()

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }

  const taskItemContainer = document.createElement('div')
  taskItemContainer.classList.add('task-item')

  const taskContent = document.createElement('p')
  taskContent.innerText = inputElement.value

  taskContent.addEventListener('click', () => handleClick(taskContent))
  
  const deleteItem = document.createElement('i')
  deleteItem.classList.add('far')
  deleteItem.classList.add('fa-trash-alt')

  deleteItem.addEventListener('click', () =>
    handleDeleteClick(taskItemContainer, taskContent)
  )

  taskItemContainer.appendChild(taskContent)
  taskItemContainer.appendChild(deleteItem)

  tasksContainer.appendChild(taskItemContainer)
  
  inputElement.value = ''
  
  updateLocalStorage()
  inputElement.focus()
}
// fim da adição de nova tarefa

// tarefa completa
const handleClick = taskContent => {
  const tasks = tasksContainer.childNodes

  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle('completed')
    }
  }
  
  updateLocalStorage()
}
// fim tarefa completa

// deletar tarefa
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes
  
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove()
    }
  }

  updateLocalStorage()
}
// fim deletar tarefa

// input vazio
const handleInputChange = () => {
  const inputIsValid = validateInput()

  if (inputIsValid) {
    return inputElement.classList.remove('error')
  }
}
// fim input vazio

// atualizar localStorage
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild
    const isCompleted = content.classList.contains('completed')

    return { description: content.innerText, isCompleted }
  })
  
  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}
// fim atualizar localStorage

// carregar tarefas
const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

  if (!tasksFromLocalStorage) return

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = task.description

    if (task.isCompleted) {
      taskContent.classList.add('completed')
    }

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-alt')

    deleteItem.addEventListener('click', () =>
      handleDeleteClick(taskItemContainer, taskContent)
    )

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)
  }
}
// fim carregar tarefas

refreshTasksUsingLocalStorage()

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('keyup', (e) =>{if(e.key ==="Enter") handleAddTask()})

inputElement.addEventListener('change', () => handleInputChange())
