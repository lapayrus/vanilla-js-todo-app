class TodoList {
    constructor() {
        this.todos = [];
        
        if (localStorage.getItem('todos') && localStorage.getItem('todos').trim()) {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        }
        
        this.tempTodo = null;

        this.renderTodosList();
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.renderTodosList();
    }

    addTodo(todoText, todoCategory) {
        const todo = {
            id: Date.now(),
            text: todoText,
            categoryId: parseInt(todoCategory),
            completed: false
        };

        this.todos.push(todo);
        this.saveToLocalStorage();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToLocalStorage();
    }

    todoStatusChange(id) {
        this.todos.forEach(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
        });
        this.saveToLocalStorage();
    }

    filterTodo(filterDate) {
        this.tempTodo = this.todos;

        const filteredDate = new Date(Date.parse(filterDate));
        filteredDate.setHours(0, 0, 0, 0);

        this.tempTodo = this.tempTodo.filter(todo => {
            const todoDate = new Date(todo.id);
            todoDate.setHours(0, 0, 0, 0);
            return todoDate.getTime() == filteredDate.getTime();
        });

        this.renderTodosList();
    }

    getCategoryName(category_id) {
        let result = 'Unknown';
        let categories = [];
        if (localStorage.getItem('categories') && localStorage.getItem('categories').trim()) {
            categories = JSON.parse(localStorage.getItem('categories')) || [];
        }
        categories.forEach(category => {
            if (category.id === category_id) {
                result = category.name;
                return;
            }
        });

        return result;
    }

    renderTodosList() {
        let todos = this.todos;
        if (this.tempTodo !== null) {
            todos = this.tempTodo;
        }
        const todoUl = document.querySelector('ul#todoList');
        todoUl.innerHTML = '';

        todos.forEach(todo => {
            const todoLi = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (todo.completed) {
                checkbox.classList.add('completed');
                checkbox.checked = true;
            }

            const button = document.createElement('button');
            button.innerText = 'Delete';
            button.classList.add('delete-btn');

            todoLi.id = todo.id || 0;
            const todoText = todo.text || '';
            const todoCategoryName = this.getCategoryName(todo.categoryId || 0);
            todoLi.innerText = todoText + ' --- ' + todoCategoryName;

            todoLi.appendChild(button);
            todoLi.appendChild(checkbox);
            todoUl.appendChild(todoLi);
        });
    }
}