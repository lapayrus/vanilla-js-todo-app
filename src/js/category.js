class CategoryList {
    constructor() {
        this.categories = [];
        if (localStorage.getItem('categories') && localStorage.getItem('categories').trim()) {
            this.categories = JSON.parse(localStorage.getItem('categories')) || [];
        }
        this.tempCategories = null;
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
        const catTable = document.querySelector('table#categoryList');
        catTable.innerHTML = '';

        // Header
        const tableHeader = document.createElement('thead');
        const headTr = document.createElement('tr');

        const headThZero = document.createElement('th');
        headThZero.setAttribute('scope', 'col');
        headThZero.innerText = '#';
        headTr.appendChild(headThZero);

        const headThTwo = document.createElement('th');
        headThTwo.setAttribute('scope', 'col');
        headThTwo.innerText = 'Category';
        headTr.appendChild(headThTwo);
        
        const headThFour = document.createElement('th');
        headThFour.setAttribute('scope', 'col');
        headThFour.innerText = 'Options';
        headTr.appendChild(headThFour);

        tableHeader.appendChild(headTr);
        catTable.appendChild(tableHeader);

        // Body
        const tableBody = document.createElement('tbody');

        categories.forEach((category, index) => {
            const bodyTr = document.createElement('tr');
            bodyTr.id = category.id || 0;

            const headThZeroOne = document.createElement('th');
            headThZeroOne.setAttribute('scope', 'row');
            headThZeroOne.innerText = index + 1;
            bodyTr.appendChild(headThZeroOne);

            const headTdTwo = document.createElement('td');
            headTdTwo.innerText = category.name || '';
            bodyTr.appendChild(headTdTwo);
            
            const headTdFour = document.createElement('td');
            const todoButton = document.createElement('button');
            todoButton.innerText = 'Delete';
            headTdFour.appendChild(todoButton);
            bodyTr.appendChild(headTdFour);

            tableBody.appendChild(bodyTr);
        });
        catTable.appendChild(tableBody);
    }

    renderCategoryOptions() {
        const catSelect = document.querySelector('select#todo_category_options');
        catSelect.innerHTML = '';
        const catSelectFilter = document.querySelector('select#todo_category_options_filter');
        catSelectFilter.innerHTML = '';

        const option = document.createElement('option');
        option.value = '';
        option.innerText = 'Select Category';
        catSelect.appendChild(option);

        const optionForFilter = document.createElement('option');
        optionForFilter.value = '';
        optionForFilter.innerText = 'Filter By Category';
        catSelectFilter.appendChild(optionForFilter);

        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id || 0;
            option.innerText = category.name || 'Error - Do Not Select';
            catSelect.appendChild(option);

            const optionForFilter = document.createElement('option');
            optionForFilter.value = category.id || 0;
            optionForFilter.innerText = category.name || 'Error - Do Not Select';
            catSelectFilter.appendChild(optionForFilter);
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
        } else if (sort_val === 'added') {
            this.tempCategories.sort((a, b) => {
                const categoryA = a.id;
                const categoryB = b.id;

                if (categoryA < categoryB) {
                    return -1;
                }
                if (categoryA > categoryB) {
                    return 1;
                }
                return 0;
            });
        }

        this.renderCategoryList();

        this.tempCategories = null;
    }
}