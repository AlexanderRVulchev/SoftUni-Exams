function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/"

    const titleInput = document.getElementById("title");
    const addButton = document.getElementById("add-button");
    const loadButton = document.getElementById("load-button");
    const todoUl = document.getElementById("todo-list");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);

    // -- Event handlers

    async function load(e) {
        if (e) {
            e.preventDefault();
        }
        todoUl.innerHTML = "";
        const tasks = await fetchAllTasks();

        for (const task of tasks) {
            const taskLi = buildTaskLi(task.name, task._id);
            todoUl.appendChild(taskLi);
        };
    }

    async function add(e) {
        e.preventDefault();
        const name = titleInput.value;
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({ name })
        });
        await load();
    }

    async function remove(e) {
        const button = e.currentTarget;
        const id = button.id;

        await fetch(baseUrl + id, { method: "DELETE" });
        await load();
    }

    function edit(e) {
        const id = e.target.id;
        const liElement = e.target.parentElement;
        const name = liElement.children[0].textContent;

        alterLiForEdit(liElement, name, id);                
    }

    async function submit(e) {
        const id = e.target.id;
        const liElement = e.target.parentElement;
        const name = liElement.children[0].value;

        await fetch(baseUrl + id, {
            method: "PATCH",
            body: JSON.stringify({ name })
        })

        await load();
    }

    // -- Helper functions

    async function fetchAllTasks() {
        const response = await fetch(baseUrl);
        const tasksObj = await response.json();
        const tasks = Array.from(Object.values(tasksObj));
        return tasks;
    }

    // -- Html builders

    function buildTaskLi(name, id) {
        let li;
        const span = buildHtmlElement("span", name, null, null);
        const removeButton = buildHtmlElement("button", "Remove", id, null);
        const editButton = buildHtmlElement("button", "Edit", id, null);

        removeButton.addEventListener("click", remove);
        editButton.addEventListener("click", edit);

        li = buildHtmlElement("li", null, null, null, span, removeButton, editButton);
        return li;
    }

    function alterLiForEdit(li, name, id) {
        li.innerHTML = "";
        const inputField = document.createElement("input");
        inputField.value = name;

        const removeButton = buildHtmlElement("button", "Remove", id, null);
        const submitButton = buildHtmlElement("button", "Submit", id, null);

        removeButton.addEventListener("click", remove);
        submitButton.addEventListener("click", submit);

        li.appendChild(inputField);
        li.appendChild(removeButton);
        li.appendChild(submitButton);
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