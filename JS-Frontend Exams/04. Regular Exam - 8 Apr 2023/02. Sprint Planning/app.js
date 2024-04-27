window.addEventListener('load', solve);

function solve() {
    let totalPoints = 0;
    let taskNumber = 1;

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const labelSelect = document.getElementById("label");
    const pointsInput = document.getElementById("points");
    const assigneeInput = document.getElementById("assignee");
    const taskIdHiddenInput = document.getElementById("task-id");
    const createTaskButton = document.getElementById("create-task-btn");
    const deleteTaskButton = document.getElementById("delete-task-btn");
    const tasksSection = document.getElementById("tasks-section");
    const totalPointsP = document.getElementById("total-sprint-points");

    createTaskButton.addEventListener("click", create);
    deleteTaskButton.addEventListener("click", deleteHandler);

    // -- Event handlers

    function create(e) {
        e.preventDefault();
        const [title, description, label, points, assignee] = readInput();
        if (title && description && label && points && assignee) {
            const article = buildArticleElement(title, description, label, points, assignee);
            tasksSection.appendChild(article);
            clearInput();
            setTotalPoints(points, true);
        }
    }

    function deleteHandler(e) {
        e.preventDefault();

        const id = taskIdHiddenInput.value;
        const articleToDelete = document.getElementById(id);        
        articleToDelete.remove();        

        const points = pointsInput.value;
        setTotalPoints(points, false);        

        clearInput();
        setInputDisabledAttribute(false);
        createTaskButton.disabled = false;
        deleteTaskButton.disabled = true;
    }

    // -- Helper functions

    function readInput() {
        const title = titleInput.value;
        const description = descriptionInput.value;
        const label = labelSelect.value;
        const points = pointsInput.value;
        const assignee = assigneeInput.value;
        return [title, description, label, points, assignee];
    }

    function setInputValues(title, description, label, points, assignee) {
        titleInput.value = title;
        descriptionInput.value = description;
        labelSelect.value = label;
        pointsInput.value = points;
        assigneeInput.value = assignee;
    }

    function setInputDisabledAttribute(toDisable) {
        titleInput.disabled = toDisable;
        descriptionInput.disabled = toDisable;
        labelSelect.disabled = toDisable;
        pointsInput.disabled = toDisable;
        assigneeInput.disabled = toDisable;
    }

    function clearInput() {
        setInputValues("", "", "", "", "");
    }

    function setTotalPoints(points, toAdd) {
        if (toAdd) {
            totalPoints += Number(points);
        } else {
            totalPoints -= Number(points);
        }
        totalPointsP.innerText = `Total Points ${totalPoints}pts`;
    }

    // -- Html builders

    function buildArticleElement(title, description, label, points, assignee) {
        const classByLabelValue = {
            "Feature": "feature",
            "Low Priority Bug": "low-priority",
            "High Priority Bug": "high-priority"
        };
        const innerHtmlByLabelValue = {
            "Feature": "Feature &#8865",
            "Low Priority Bug": "Low Priority Bug &#9737",
            "High Priority Bug": "High Priority Bug &#9888"
        }

        const deleteButton = buildHtmlElement("button", "Delete", null, null);

        const labelDiv = buildHtmlElement("div", null, null, ["task-card-label", classByLabelValue[label]]);
        const titleH3 = buildHtmlElement("h3", title, null, ["task-card-title"]);
        const descriptionP = buildHtmlElement("p", description, null, ["task-card-description"]);
        const pointsDiv = buildHtmlElement("div", `Estimated at ${points} pts`, null, ["task-card-points"]);
        const assigneeDiv = buildHtmlElement("div", `Assigned to: ${assignee}`, null, ["task-card-assignee"]);
        const btnContainerDiv = buildHtmlElement("div", null, null, ["task-card-actions"], deleteButton);
        labelDiv.innerHTML = innerHtmlByLabelValue[label];

        const article = buildHtmlElement(
            "article", null, `task-${taskNumber++}`, ["task-card"], labelDiv, titleH3, descriptionP, pointsDiv, assigneeDiv, btnContainerDiv
        );

        deleteButton.addEventListener("click", () => {
            setInputValues(title, description, label, points, assignee);
            createTaskButton.disabled = true;
            deleteTaskButton.disabled = false;
            setInputDisabledAttribute(true);
            taskIdHiddenInput.value = article.id;
        });

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