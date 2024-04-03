window.addEventListener("load", solve);

function solve() {
    const expenseInput = document.getElementById("expense");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const addButton = document.getElementById("add-btn");
    const previewUl = document.getElementById("preview-list");
    const expensesUl = document.getElementById("expenses-list");
    const deleteButton = document.getElementsByClassName("delete")[0];

    addButton.addEventListener("click", add);

    deleteButton.addEventListener("click", () => {
        location.reload();
    })

    // -- Event handlers

    function add() {
        const [expense, amount, date] = readInput();
        if (expense && amount && date) {
            clearInput();
            addButton.disabled = true;
            const previewLi = buildPreviewLi(expense, amount, date);
            previewUl.appendChild(previewLi);
        }
    }

    // -- Helper functions

    function readInput() {
        const expense = expenseInput.value;
        const amount = amountInput.value;
        const date = dateInput.value;
        return [expense, amount, date];
    }

    function setInput(expense, amount, date) {
        expenseInput.value = expense;
        amountInput.value = amount;
        dateInput.value = date;
    }

    function clearInput() {
        setInput("", "", "");
    }

    // -- Html builders

    function buildPreviewLi(expense, amount, date) {
        const article = buildArticleElement(expense, amount, date);

        const editButton = buildHtmlElement("button", "edit", null, ["btn", "edit"]);
        const okButton = buildHtmlElement("button", "ok", null, ["btn", "ok"]);
        const buttonsDiv = buildHtmlElement("div", null, null, ["buttons"], editButton, okButton);

        const previewLi = buildHtmlElement("li", null, null, ["expense-item"], article, buttonsDiv);

        editButton.addEventListener("click", () => {
            addButton.disabled = false;
            setInput(expense, amount, date);
            previewLi.remove();
        })

        okButton.addEventListener("click", () => {
            addButton.disabled = false;
            previewLi.remove();
            const article = buildArticleElement(expense, amount, date);
            const expensesLi = buildHtmlElement("li", null, null, ["expense-item"], article);
            expensesUl.appendChild(expensesLi);
        })

        return previewLi;
    }

    function buildArticleElement(expense, amount, date) {
        const expenseP = buildHtmlElement("p", `Type: ${expense}`, null, null);
        const amountP = buildHtmlElement("p", `Amount: ${amount}$`, null, null);
        const dateP = buildHtmlElement("p", `Date: ${date}`, null, null);
        const article = buildHtmlElement("article", null, null, null, expenseP, amountP, dateP);
        return article;
    }

    function buildHtmlElement(tag, text, id, classNames, ...children) {
        const element = document.createElement(tag);
        if (text !== null) {
            element.textContent = text;
        }
        if (id !== null) {
            element.id = id;
        }
        if (classNames !== null) {
            classNames.forEach(className => {
                element.classList.add(className);
            });
        }

        for (const child of children) {
            element.appendChild(child);
        }

        return element;
    }
}