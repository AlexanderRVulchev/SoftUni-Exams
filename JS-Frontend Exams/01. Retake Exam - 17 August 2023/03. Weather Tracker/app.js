function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let idForEdit = "";

    const locationInput = document.getElementById("location");
    const temperatureInput = document.getElementById("temperature");
    const dateInput = document.getElementById("date");
    const loadButton = document.getElementById("load-history");
    const addButton = document.getElementById("add-weather");
    const editButton = document.getElementById("edit-weather");
    const listUl = document.getElementById("list");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);
    editButton.addEventListener("click", edit);

    async function load() {
        listUl.innerHTML = "";
        const records = await fetchAllRecords();
        for (const record of records) {
            const recordContainerDiv = buildRecordContainerDiv(record.location, record.temperature, record.date, record._id);
            listUl.appendChild(recordContainerDiv);
        }
    }

    async function add() {
        const [location, temperature, date] = readInput();
        clearInput();
        const data = { location, temperature, date };

        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });

        await load();
    }

    async function edit() {
        const [location, temperature, date] = readInput();
        clearInput();

        editButton.disabled = true;
        addButton.disabled = false;

        const data = { location, temperature, date };
        await fetch(baseUrl + idForEdit, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        await load();
    }

    async function fetchAllRecords() {
        const response = await fetch(baseUrl);
        const recordsObj = await response.json();
        return Array.from(Object.values(recordsObj));
    }

    function readInput() {
        const location = locationInput.value;
        const temperature = temperatureInput.value;
        const date = dateInput.value;
        return [location, temperature, date];
    }

    function setInput(location, temperature, date) {
        locationInput.value = location;
        temperatureInput.value = temperature;
        dateInput.value = date;
    }

    function clearInput() {
        setInput("", "", "");
    }

    function buildRecordContainerDiv(location, temperature, date, id) {
        const changeButton = buildHtmlElement("button", "Change", null, ["change-btn"]);
        const deleteButton = buildHtmlElement("button", "Delete", null, ["delete-btn"]);

        const locationH2 = buildHtmlElement("h2", location, null, null);
        const dateH3 = buildHtmlElement("h3", date, null, null);
        const temperatureH3 = buildHtmlElement("h3", temperature, "celsius", null);
        const buttonsContainerDiv = buildHtmlElement("div", null, "buttons-container", null, changeButton, deleteButton);

        const divContainer = buildHtmlElement("div", null, null, ["container"], locationH2, dateH3, temperatureH3, buttonsContainerDiv);

        changeButton.addEventListener("click", () => {
            setInput(location, temperature, date);
            divContainer.remove();
            idForEdit = id;
            addButton.disabled = true;
            editButton.disabled = false;
        })

        deleteButton.addEventListener("click", async () => {           
            await fetch(baseUrl + id, {
                method: "DELETE"
            })

            await load();
        })

        return divContainer;
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

attachEvents();