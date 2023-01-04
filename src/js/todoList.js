class TodoList {
    constructor() {
        this.todos = [];
        
        if (localStorage.getItem('todos') && localStorage.getItem('todos').trim()) {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        }
        
        this.tempTodo = null;
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

    filterTodo(filterOn, filterVal) {
        this.tempTodo = this.todos;

        if (filterOn === 'DATE_FILTER') {
            const filteredDate = new Date(Date.parse(filterVal));
            filteredDate.setHours(0, 0, 0, 0);

            this.tempTodo = this.tempTodo.filter(todo => {
                const todoDate = new Date(todo.id);
                todoDate.setHours(0, 0, 0, 0);
                return todoDate.getTime() == filteredDate.getTime();
            });
        } else if (filterOn === 'TODO_SEARCH_FILTER') {
            this.tempTodo = this.tempTodo.filter(todo => {
                return todo.text.toLowerCase().includes(filterVal.toLowerCase());
            });
        } else if (filterOn === 'TODO_CATEGORY_FILTER') {
            this.tempTodo = this.tempTodo.filter(todo => {
                if (filterVal == 0 || filterVal == '') {
                    return true;
                } else {
                    return todo.categoryId === parseInt(filterVal);
                }
            });
        }

        this.renderTodosList();

        this.tempTodo = null;
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

        const todoTable = document.querySelector('table#todoList');
        todoTable.innerHTML = '';

        // Header
        const tableHeader = document.createElement('thead');
        const headTr = document.createElement('tr');

        const headThZero = document.createElement('th');
        headThZero.setAttribute('scope', 'col');
        headThZero.innerText = '#';
        headTr.appendChild(headThZero);

        const headThOne = document.createElement('th');
        headThOne.setAttribute('scope', 'col');
        headThOne.innerText = 'Is Completed';
        headTr.appendChild(headThOne);

        const headThTwo = document.createElement('th');
        headThTwo.setAttribute('scope', 'col');
        headThTwo.innerText = 'Todo';
        headTr.appendChild(headThTwo);
        
        const headThThree = document.createElement('th');
        headThThree.setAttribute('scope', 'col');
        headThThree.innerText = 'Category';
        headTr.appendChild(headThThree);
        
        const headThFour = document.createElement('th');
        headThFour.setAttribute('scope', 'col');
        headThFour.innerText = 'Options';
        headTr.appendChild(headThFour);

        tableHeader.appendChild(headTr);
        todoTable.appendChild(tableHeader);

        // Body
        const tableBody = document.createElement('tbody');

        const newObj = this;
        todos.forEach(function(todoObject, index) {
            const bodyTr = document.createElement('tr');
            bodyTr.id = todoObject.id || 0;

            const headThZeroOne = document.createElement('th');
            headThZeroOne.setAttribute('scope', 'row');
            headThZeroOne.innerText = index + 1;
            bodyTr.appendChild(headThZeroOne);

            const headTdOne = document.createElement('td');
            const todoCheckbox = document.createElement('input');
            todoCheckbox.type = 'checkbox';
            todoCheckbox.setAttribute('role', 'switch');
            if (todoObject.completed) {
                todoCheckbox.checked = true;
            }
            headTdOne.appendChild(todoCheckbox);
            bodyTr.appendChild(headTdOne);

            const headTdTwo = document.createElement('td');
            headTdTwo.innerText = todoObject.text || '';
            bodyTr.appendChild(headTdTwo);
            
            const headTdThree = document.createElement('td');
            headTdThree.innerText = newObj.getCategoryName(todoObject.categoryId || 0);
            bodyTr.appendChild(headTdThree);
            
            const headTdFour = document.createElement('td');
            const todoButton = document.createElement('button');
            todoButton.innerText = 'Delete';
            headTdFour.appendChild(todoButton);
            bodyTr.appendChild(headTdFour);

            tableBody.appendChild(bodyTr);
        });
        todoTable.appendChild(tableBody);
    }
}