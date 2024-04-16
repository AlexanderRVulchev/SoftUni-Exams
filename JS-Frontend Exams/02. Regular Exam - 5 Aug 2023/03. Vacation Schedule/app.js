function onLoad() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let idForEdit = "";

    const nameInput = document.getElementById("name");
    const daysInput = document.getElementById("num-days");
    const dateInput = document.getElementById("from-date");
    const addButton = document.getElementById("add-vacation");
    const editButton = document.getElementById("edit-vacation");
    const loadButton = document.getElementById("load-vacations");
    const listUl = document.getElementById("list");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);
    editButton.addEventListener("click", edit);

    // -- Event handlers

    async function load() {
        editButton.disabled = true;
        listUl.innerHTML = "";
        const vacations = await fetchGet();
        for (const vacation of vacations) {
            const [name, days, date, id] = deconstructVacation(vacation);
            const container = buildVacationContainer(name, days, date, id);
            listUl.appendChild(container);
        }
    }

    async function add() {
        const [name, days, date] = readInput();
        clearInput();
        await fetchPost(name, days, date);
        await load();
    }

    async function edit() {
        const [name, days, date] = readInput();
        clearInput();
        await fetchPut(name, days, date, idForEdit);
        await load();
    }

    // -- Http requests

    async function fetchGet() {
        const response = await fetch(baseUrl);
        const vacationsObj = await response.json();
        const vacations = Object.values(vacationsObj);
        return Array.from(vacations);
    }

    async function fetchPost(name, days, date) {
        const data = { name, days, date };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    async function fetchPut(name, days, date, id) {
        const data = { name, days, date };
        await fetch(baseUrl + id, {
            method: "PUT",
            body: JSON.stringify(data)
        })
    }

    async function fetchDelete(id) {
        await fetch(baseUrl + id, {
            method: "DELETE"
        })
    }

    // -- Helper functions

    function readInput() {
        const name = nameInput.value;
        const days = daysInput.value;
        const date = dateInput.value;
        return [name, days, date];
    }

    function setInput(name, days, date) {
        nameInput.value = name;
        daysInput.value = days;
        dateInput.value = date;
    }

    function clearInput() {
        setInput("", "", "");
    }

    function deconstructVacation(vacation) {
        const name = vacation.name;
        const days = vacation.days;
        const date = vacation.date;
        const id = vacation._id;
        return [name, days, date, id];
    }

    // -- Html builders

    function buildVacationContainer(name, days, date, id) {
        const nameH2 = buildHtmlElement("h2", name, null, null);
        const dateH3 = buildHtmlElement("h3", date, null, null);
        const daysH3 = buildHtmlElement("h3", days, null, null);
        const changeButton = buildHtmlElement("button", "Change", null, ["change-btn"]);
        const doneButton = buildHtmlElement("button", "Done", null, ["done-btn"]);

        const containerDiv = buildHtmlElement("div", null, null, ["container"], nameH2, dateH3, daysH3, changeButton, doneButton);

        changeButton.addEventListener("click", async () => {
            setInput(name, days, date);
            idForEdit = id;
            addButton.disabled = true;
            editButton.disabled = false;
            containerDiv.remove();
        });

        doneButton.addEventListener("click", async () => {
            await fetchDelete(id);
            await load();
        })

        return containerDiv;
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

onLoad();