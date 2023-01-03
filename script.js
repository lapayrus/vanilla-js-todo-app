const Category = new CategoryList();
const Todo = new TodoList();

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

const categoryUl = document.querySelector('ul#categoryList');
if (categoryUl) {
    categoryUl.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.tagName === 'BUTTON') {
            const categoryId = parseInt(event.target.parentElement.id);
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

const filterDate = document.querySelector('#todo_date');
filterDate.addEventListener('change', event => {
    event.preventDefault();
    Todo.filterTodo(event.target.value);
});

const todoUl = document.querySelector('ul#todoList');
if (todoUl) {
    todoUl.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.tagName === 'BUTTON') {
            const todoId = parseInt(event.target.parentElement.id);
            Todo.deleteTodo(todoId);
        } else if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const todoId = parseInt(event.target.parentElement.id);
            Todo.todoStatusChange(todoId);
        }
    });
}

window.onload = () => {
    /**
     * I have tried to listen the storage changes, just to implement a functionality and it worked but the issue is i am not able to see the changes in the same table, but able to see changing in different tab.
     * So first method I tried is window.addEventListener('storage', /** code *\/)
     * Second one I tried and satified is -> window.onstorage
    */
    window.onstorage = event => {
        console.log('Event');
        if (event.key === 'categories') {
            Todo.renderTodosList();
        }
    };
};