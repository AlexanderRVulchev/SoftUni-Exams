function onLoad() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let idForEdit = "";

    const titleInput = document.getElementById("course-name");
    const typeInput = document.getElementById("course-type");
    const descriptionInput = document.getElementById("description");
    const teacherInput = document.getElementById("teacher-name");
    const addButton = document.getElementById("add-course");
    const editButton = document.getElementById("edit-course");
    const loadButton = document.getElementById("load-course");
    const listDiv = document.getElementById("list");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);
    editButton.addEventListener("click", edit);

    // -- Event handlers

    async function load() {
        listDiv.innerHTML = "";
        const courses = await fetchGet();
        for (const course of courses) {
            const [title, type, description, teacher, id] = deconstructCourseObject(course);
            const containerDiv = buildContainerDiv(title, type, description, teacher, id);
            listDiv.appendChild(containerDiv);
        }
    }

    async function add(e) {
        e.preventDefault();
        const [title, type, description, teacher] = readInput();
        clearInput();
        await fetchPost(title, type, description, teacher);
        await load();
    }

    async function edit(e) {
        e.preventDefault();
        const [title, type, description, teacher] = readInput();
        clearInput();
        editButton.disabled = true;
        addButton.disabled = false;
        await fetchPut(title, type, description, teacher);
        await load();
    }

    // -- Http requests

    async function fetchGet() {
        const response = await fetch(baseUrl);
        const coursesObj = await response.json();
        const courses = Object.values(coursesObj);
        return Array.from(courses);
    }

    async function fetchPost(title, type, description, teacher) {
        const data = { title, type, description, teacher }
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    async function fetchPut(title, type, description, teacher) {
        const data = { title, type, description, teacher }
        await fetch(baseUrl + idForEdit, {
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

    function deconstructCourseObject(course) {
        const title = course.title;
        const type = course.type;
        const description = course.description;
        const teacher = course.teacher;
        const id = course._id;
        return [title, type, description, teacher, id]
    }

    function readInput() {
        const title = titleInput.value;
        const type = typeInput.value;
        const description = descriptionInput.value;
        const teacher = teacherInput.value;
        return [title, type, description, teacher];
    }

    function setInput(title, type, description, teacher) {
        titleInput.value = title;
        typeInput.value = type;
        descriptionInput.value = description;
        teacherInput.value = teacher;
    }

    function clearInput() {
        setInput("", "", "", "");
    }

    // -- Html builders

    function buildContainerDiv(title, type, description, teacher, id) {
        const titleH2 = buildHtmlElement("h2", title, null, null);
        const teacherH3 = buildHtmlElement("h3", teacher, null, null);
        const typeH3 = buildHtmlElement("h3", type, null, null);
        const descriptionH4 = buildHtmlElement("h4", description, null, null);
        const editBtn = buildHtmlElement("button", "Edit Course", null, ["edit-btn"]);
        const finishBtn = buildHtmlElement("button", "Finish Course", null, ["finish-btn"]);

        const containerDiv = buildHtmlElement("div", null, null, ["container"], titleH2, teacherH3, typeH3, descriptionH4, editBtn, finishBtn);

        editBtn.addEventListener("click", () => {
            setInput(title, type, description, teacher);
            containerDiv.remove();
            idForEdit = id;
            addButton.disabled = true;
            editButton.disabled = false;
        })

        finishBtn.addEventListener("click", async () => {
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