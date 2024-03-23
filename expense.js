// Check if there's existing data in local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>${expense.amount.toFixed(2)}</strong> - ${expense.description} (${expense.category})
            </span>
            <div>
                <button type="button" class="btn btn-light btn-sm" onclick="editExpense(${index})">Edit</button>
                <button type="button" class="btn btn-light btn-sm" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
}

// Function to add an expense
function addExpense() {
    const amountInput = document.getElementById('amountInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const categoryInput = document.getElementById('categoryInput');

    const expenseAmount = parseFloat(amountInput.value);
    const expenseDescription = descriptionInput.value;
    const expenseCategory = categoryInput.value;

    // Check if inputs are valid
    if (!isNaN(expenseAmount) && expenseAmount > 0 && expenseDescription.trim() !== '') {
        const newExpense = {
            amount: expenseAmount,
            description: expenseDescription,
            category: expenseCategory
        };

        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    // Clear input fields
    amountInput.value = '';
    descriptionInput.value = '';
}

// Function to edit an expense
function editExpense(index) {
    const editedAmount = prompt('Enter new amount:', expenses[index].amount);
    const editedDescription = prompt('Enter new description:', expenses[index].description);
    const editedCategory = prompt('Enter new category:', expenses[index].category);

    if (editedAmount !== null && editedDescription !== null && editedCategory !== null) {
        expenses[index] = {
            amount: parseFloat(editedAmount),
            description: editedDescription,
            category: editedCategory
        };

        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

// Function to delete an expense
function deleteExpense(index) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');

    if (confirmDelete) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }
}

// Initial rendering
renderExpenses();
