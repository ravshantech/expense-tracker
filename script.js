let records = []; 

const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('list');

const incomeBox = document.getElementById('total-income');
const expenseBox = document.getElementById('total-expense');
const balanceBox = document.getElementById('balance');

addBtn.addEventListener("click", addRecord);

function addRecord() {
    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);

    if (title === "" || amount <= 0) return;

    const record = {
        id: Date.now(),
        title,
        amount,
        type: typeInput.value,
        date: new Date().toISOString().slice(0, 10)
    };

    records.push(record);
    save();
    render();

    titleInput.value = "";
    amountInput.value = "";
}

function render() {
    list.innerHTML = "";

    records.forEach(r => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${r.title} - $${r.amount} (${r.type})
            <button onclick="del(${r.id})">X</button>
        `;

        list.appendChild(li);
    });

    updateSummary();
}

function del(id) {
    records = records.filter(r => r.id !== id);
    save();
    render();
}

function updateSummary() {
    const income = records
        .filter(r => r.type === "income")
        .reduce((sum, r) => sum + r.amount, 0);

    const expense = records
        .filter(r => r.type === "expense")
        .reduce((sum, r) => sum + r.amount, 0);

    incomeBox.textContent = income;
    expenseBox.textContent = expense;
    balanceBox.textContent = income - expense;
}

function save() {
    localStorage.setItem("records", JSON.stringify(records));
}

function load() {
    const saved = localStorage.getItem("records");
    if (saved) records = JSON.parse(saved);
}

load();
render();
