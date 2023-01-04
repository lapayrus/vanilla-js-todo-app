class CategoryList {
    constructor() {
        this.categories = [];
        if (localStorage.getItem('categories') && localStorage.getItem('categories').trim()) {
            this.categories = JSON.parse(localStorage.getItem('categories')) || [];
        }
        this.tempCategories = null;

        this.renderCategoryOptions();
        this.renderCategoryList();
    }

    saveCategoryToLocalStorage() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
        this.renderCategoryOptions();
        this.renderCategoryList();
    }

    renderCategoryList() {
        let categories = this.categories;
        if (this.tempCategories !== null) {
            categories = this.tempCategories;
        }
        const catUl = document.querySelector('ul#categoryList');
        catUl.innerHTML = '';

        categories.forEach(category => {
            const catLi = document.createElement('li');
            catLi.id = category.id || 0;

            const button = document.createElement('button');
            button.innerText = 'Delete';
            button.classList.add('delete-btn');

            const categorySpan = document.createElement('span');
            categorySpan.classList.add('categorySpan');
            categorySpan.innerText = category.name || '';

            catLi.appendChild(categorySpan);
            catLi.appendChild(button);
            catUl.appendChild(catLi);
        });
    }

    renderCategoryOptions() {
        const catSelect = document.querySelector('select#todo_category_options');
        catSelect.innerHTML = '';

        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.innerText = category.name;

            catSelect.appendChild(option);
        });
    }

    addCategory(categoryText) {
        const newCategory = {
            id: Date.now(),
            name: categoryText
        };
        this.categories.push(newCategory);
        this.saveCategoryToLocalStorage();
    }

    deleteCategory(id) {
        this.categories = this.categories.filter(category => category.id !== id);
        this.saveCategoryToLocalStorage();
    }

    sortCategory(sort_val) {
        this.tempCategories = this.categories;

        if (sort_val === 'category_asc') {
            this.tempCategories.sort((a, b) => {
                const categoryA = a.name.toLowerCase();
                const categoryB = b.name.toLowerCase();

                if (categoryA < categoryB) {
                    return -1;
                }
                if (categoryA > categoryB) {
                    return 1;
                }
                return 0;
            });
        } else if (sort_val === 'category_desc') {
            this.tempCategories.sort((a, b) => {
                const categoryA = a.name.toLowerCase();
                const categoryB = b.name.toLowerCase();

                if (categoryA < categoryB) {
                    return 1;
                }
                if (categoryA > categoryB) {
                    return -1;
                }
                return 0;
            });
        }

        this.renderCategoryList();

        this.tempCategories = null;
    }
}