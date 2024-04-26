function solve(input) {
    let sprint = {};
    let tasks = {
        "ToDo": 0,
        "In Progress": 0,
        "Code Review": 0,
        "Done": 0
    }
    const numberOfElements = Number(input.shift());

    for (let i = 0; i < numberOfElements; i++) {
        const [assignee, taskId, title, status, points] = input.shift().split(":");
        if (!sprint.hasOwnProperty(assignee)) {
            sprint[assignee] = []
        };
        tasks[status] += Number(points);
        sprint[assignee].push({ taskId, title, status, points: Number(points) });
    }

    while (input.length > 0) {
        const [command, ...restOfTheTokens] = input.shift().split(":");

        if (command === "Add New") {
            addNew(restOfTheTokens);
        } else if (command === "Change Status") {
            changeStatus(restOfTheTokens);
        } else if (command === "Remove Task") {
            removeTask(restOfTheTokens);
        }
    }

    console.log(`ToDo: ${tasks["ToDo"]}pts`);
    console.log(`In Progress: ${tasks["In Progress"]}pts`);
    console.log(`Code Review: ${tasks["Code Review"]}pts`);
    console.log(`Done Points: ${tasks["Done"]}pts`);
    if (tasks["Done"] >= tasks["ToDo"] + tasks["In Progress"] + tasks["Code Review"]) {
        console.log("Sprint was successful!");
    } else {
        console.log("Sprint was unsuccessful...");
    }

    function addNew(tokens) {
        const [assignee, taskId, title, status, points] = tokens;
        if (assigneeIsValid(assignee)) {
            sprint[assignee].push({ taskId, title, status, points: Number(points) });
            tasks[status] += Number(points);
        }
    }

    function changeStatus(tokens) {
        const [assignee, taskId, newStatus] = tokens;
        if (assigneeIsValid(assignee)) {
            const task = sprint[assignee].find(t => t.taskId === taskId);
            if (task) {
                tasks[task.status] -= task.points;
                task.status = newStatus;
                tasks[task.status] += task.points;
            } else {
                console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
            }
        }
    }

    function removeTask(tokens) {
        const [assignee, indexAsString] = tokens;
        const index = Number(indexAsString);
        if (assigneeIsValid(assignee)) {
            if (index >= 0 && index < sprint[assignee].length) {
                const task = sprint[assignee][index];
                tasks[task.status] -= task.points;
                sprint[assignee].splice(index, 1);
            } else {
                console.log(`Index is out of range!`);
            }
        }
    }

    function assigneeIsValid(assignee) {
        if (!sprint.hasOwnProperty(assignee)) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
            return false;
        } else {
            return true;
        }
    }
}