import { saveTodoIntoLocalStorage, getTodoFromLocalStorage, getDateRepresentation } from "./utilits.js";

const todoInput = document.querySelector("[data-todo-text-input]");
const searchInput = document.querySelector("[data-search-todo-input]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const todoContainer = document.querySelector("[data-todo-container]");
const template = document.querySelector("[data-todo-template]");

let todoList = getTodoFromLocalStorage();
let filteredTodoList = [];

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.trim();
    
    filterAndRenderFilteredTodos(searchValue);
})

todoInput.addEventListener("input", () => {
    if (searchInput.value.trim()) {
        searchInput.value = "";
        render();
    }
})

const render = () => {
    if (todoList.length === 0) {
        todoContainer.innerHTML = "<h3>No todos yet...</h3>";
        return;
    }

    todoContainer.innerHTML = "";
    todoList.forEach((t) => {
        const todoElement = createElementLayout(t);
        todoContainer.append(todoElement);
    })
}

const filteredRender = () => {
    todoContainer.innerHTML = "";
    filteredTodoList.forEach((t) => {
        const todoElement = createElementLayout(t);
        todoContainer.append(todoElement);
    })
}

const filterAndRenderFilteredTodos = (searchValue) => {
    filteredTodoList = todoList.filter((t) => {
        return t.text.includes(searchValue);
    })
    filteredRender();
}

const createElementLayout = (t) => {
    const todoElement = document.importNode(template.content, true);

    const checkbox = todoElement.querySelector("[data-todo-checkbox]");
    checkbox.checked = t.completed;

    const todoText = todoElement.querySelector("[data-todo-text]");
    todoText.textContent = t.text;

    const todoCreatedDate = todoElement.querySelector("[data-todo-date]");
    todoCreatedDate.textContent = t.createdAt;

    const todoRemoveBtn = todoElement.querySelector("[data-remove-todo-btn]");
    todoRemoveBtn.disabled = !t.completed;

    checkbox.addEventListener("change", (e) => {
        todoList = todoList.map((todo) => {
            if (todo.id === t.id) {
                todo.completed = e.target.checked;
            }
            return todo;
        })
        saveTodoIntoLocalStorage(todoList);

        if (searchInput.value.trim()) {
            filterAndRenderFilteredTodos(searchInput.value.trim());
        } else {
            render();
        }
    })

    todoRemoveBtn.addEventListener("click", () => {
        todoList = todoList.filter((todo) => {
            if (todo.id !== t.id) {
                return todo;
            }
        })
        saveTodoIntoLocalStorage(todoList);

        if (searchInput.value.trim()) {
            filterAndRenderFilteredTodos(searchInput.value.trim());
        } else {
            render();
        }
    })

    return todoElement;
}

addTodoBtn.addEventListener("click", () => {
    if (todoInput.value.trim()) {
        const newTodo = {
            id: Date.now(),
            text: todoInput.value.trim(),
            completed: false,
            createdAt: getDateRepresentation(new Date()),
        }

        todoList.push(newTodo);
        todoInput.value = "";

        saveTodoIntoLocalStorage(todoList);
        render();
    }
})



render();