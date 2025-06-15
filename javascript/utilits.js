const TODO_KEY = "todos";

export const saveTodoIntoLocalStorage = (todoList) => {
    localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}

export const getTodoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(TODO_KEY)) || [];
}

export const getDateRepresentation = (todoCreatedDate) => {
    return Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }).format(todoCreatedDate);
}