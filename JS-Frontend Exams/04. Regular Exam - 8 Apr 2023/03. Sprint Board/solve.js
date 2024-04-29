function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";

    const loadButton = document.getElementById("load-board-btn");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const addTaskButton = document.getElementById("create-task-btn");
    const toDoUl = document.querySelector("#todo-section ul");
    const inProgressUl = document.querySelector("#in-progress-section ul");
    const codeReviewUl = document.querySelector("#code-review-section ul");
    const DoneUl = document.querySelector("#done-section ul");

    loadButton.addEventListener("click", load);
    addTaskButton.addEventListener("click", add);


    // -- Event handlers

    async function load(e) {
        if (e) {
            e.preventDefault();
        }

        clearLists();

        const tasks = await fetchGet();                
        for (const task of tasks) {
            const [title, description, status, id] = deconstructTaskObject(task);
            const taskLi = buildTaskLi(title, description, status, id);
            const statusListUl = getListElementByStatus(status);
            statusListUl.appendChild(taskLi);
        }
    }

    async function add(e) {
        e.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;

        titleInput.value = "";
        descriptionInput.value = "";

        await fetchPost(title, description);
        await load();
    }

    // -- Http requests

    async function fetchGet() {        
        const response = await fetch(baseUrl);
        const tasksObj = await response.json();
        const tasks = Object.values(tasksObj);
        return Array.from(tasks);
    }

    async function fetchPost(title, description) {
        const data = { title, description, status: "ToDo" };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    async function fetchPatch(status, id) {
        const data = { status };
        await fetch(baseUrl + id, {
            method: "PATCH",
            body: JSON.stringify(data)
        })
    }

    async function fetchDelete(id) {
        await fetch(baseUrl + id, {
            method: "DELETE"
        });
    }

    // -- Helper functions

    function deconstructTaskObject(task) {
        const title = task.title;
        const description = task.description;
        const status = task.status;
        const id = task._id;
        return [title, description, status, id];
    }

    function getStatusButtonText(status) {
        const buttonTextsByStatus = {
            "ToDo": "Move to In Progress",
            "In Progress": "Move to Code Review",
            "Code Review": "Move to Done",
            "Done": "Close"
        };
        return buttonTextsByStatus[status];
    }

    function getListElementByStatus(status) {
        const listElementByStatus = {
            "ToDo": toDoUl,
            "In Progress": inProgressUl,
            "Code Review": codeReviewUl,
            "Done": DoneUl
        };
        return listElementByStatus[status];
    }

    function getNextStatus(status) {
        const nextStatusByCurrentStatus = {
            "ToDo": "In Progress",
            "In Progress": "Code Review",
            "Code Review": "Done",
        };
        return nextStatusByCurrentStatus[status];
    }

    function clearLists() {        
        toDoUl.innerHTML = "";
        inProgressUl.innerHTML = "";
        codeReviewUl.innerHTML = "";
        DoneUl.innerHTML = "";
    }

    // -- Html builders

    function buildTaskLi(title, description, status, id) {
        const titleH3 = buildHtmlElement("h3", title, null, null);
        const descriptionP = buildHtmlElement("p", description, null, null);
        const actionButton = buildHtmlElement("button", getStatusButtonText(status), null, null);

        const taskLi = buildHtmlElement("li", null, null, ["task"], titleH3, descriptionP, actionButton);

        actionButton.addEventListener("click", async () => {
            if (status === "Done") {
                await fetchDelete(id);
            } else {
                const nextStatus = getNextStatus(status);
                await fetchPatch(nextStatus, id);
            }
            await load();
        })

        return taskLi;
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