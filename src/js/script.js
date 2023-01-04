const Category = new CategoryList();
const Todo = new TodoList();

const showTodoPage = () => {
    const todoCol = document.querySelector('#todosCol');
    const categoryCol = document.querySelector('#categoryCol');
    Todo.renderTodosList();
    Category.renderCategoryOptions();
    if (todoCol) {
        todoCol.classList.remove('hiddenClass');
    }
    if (categoryCol) {
        categoryCol.classList.add('hiddenClass');
    }
};

const showCategoriesPage = () => {
    const todoCol = document.querySelector('#todosCol');
    const categoryCol = document.querySelector('#categoryCol');
    Category.renderCategoryList();
    if (todoCol) {
        todoCol.classList.add('hiddenClass');
    }
    if (categoryCol) {
        categoryCol.classList.remove('hiddenClass');
    }
};

const handleRouting = () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('page')) {
        const pageVal = urlParams.get('page');
        if (pageVal === 'categories') {
            showCategoriesPage();
        } else {
            showTodoPage();
        }
    } else {
        showTodoPage();
    }
};

function routeLink(event) {
    event.preventDefault();
    const link = (event.target.parentElement.getAttribute('href') || 'index.html');
    history.pushState({page: 'home'}, '',  link);
    handleRouting();
}

window.onload = () => {
    
    handleRouting();

    /**
     * Category functions -> add, delete and filter
     */
    const categoryform = document.querySelector('#categoryForm');
    categoryform.addEventListener('submit', event => {
        event.preventDefault();
        const categoryText = event.target.elements.category.value;
        if (categoryText.trim() !== '') {
            Category.addCategory(categoryText);
        }
        event.target.elements.category.value = '';
    });

    const categorySorting = document.querySelector('#category_sort');
    categorySorting.addEventListener('change', event => {
        event.preventDefault();
        Category.sortCategory(event.target.value);
    });

    const categoryTable = document.querySelector('table#categoryList');
    if (categoryTable) {
        categoryTable.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.tagName === 'BUTTON') {
                const categoryId = parseInt(event.target.parentElement.parentElement.id) || 0;
                Category.deleteCategory(categoryId);
            }
        });
    }


    /**
     * Todo functions -> add, delete and filter.
     */
    const form = document.querySelector('#todoForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const todoText = event.target.elements.todo.value;
        const todoCategory = event.target.elements.todo_category_options.value;
        if (todoText.trim() !== '') {
            Todo.addTodo(todoText, todoCategory);
        }
        event.target.elements.todo.value = '';
    });

    const filterDate = document.querySelector('#todo_date_filter');
    filterDate.addEventListener('change', event => {
        Todo.filterTodo('DATE_FILTER', event.target.value);
    });

    const searchTodoFilter = document.querySelector('#todo_search_filter');
    searchTodoFilter.addEventListener('keyup', event => {
        Todo.filterTodo('TODO_SEARCH_FILTER', event.target.value);
    });

    const filterTodoCategory = document.querySelector('#todo_category_options_filter');
    filterTodoCategory.addEventListener('change', event => {
        Todo.filterTodo('TODO_CATEGORY_FILTER', event.target.value);
    });

    const todoTable = document.querySelector('table#todoList');
    if (todoTable) {
        todoTable.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.tagName === 'BUTTON') {
                filterDate.value = '';
                searchTodoFilter.value = '';
                filterTodoCategory.value = '';
                const todoId = parseInt(event.target.parentElement.parentElement.id) || 0;
                Todo.deleteTodo(todoId);
            } else if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
                const todoId = parseInt(event.target.parentElement.parentElement.id) || 0;
                Todo.todoStatusChange(todoId);
            }
        });
    }
};