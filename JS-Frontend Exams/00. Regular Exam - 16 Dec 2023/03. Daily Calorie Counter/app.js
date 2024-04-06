function onLoad() {
    const baseUrl = "http://localhost:3030/jsonstore/tasks/";
    let idForEdit = "";

    const foodInput = document.getElementById("food");
    const timeInput = document.getElementById("time");
    const caloriesInput = document.getElementById("calories");
    const addButton = document.getElementById("add-meal");
    const editButton = document.getElementById("edit-meal");
    const listDiv = document.getElementById("list");
    const loadButton = document.getElementById("load-meals");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);
    editButton.addEventListener("click", edit);

    // -- Event handlers

    async function load(e) {
        if (e) {
            e.preventDefault();
        }

        listDiv.innerHTML = "";
        editButton.disabled = true;
        const meals = await fetchGet();
        for (const meal of meals) {
            const [food, time, calories, id] = deconstructMealObject(meal);
            const mealDiv = buildMealDiv(food, time, calories, id);
            listDiv.appendChild(mealDiv);
        }
    }

    async function add(e) {
        e.preventDefault();
        const [food, time, calories] = readInput();
        clearInput();
        await fetchPost(food, time, calories);
        await load();
    }

    async function edit(e) {
        e.preventDefault();
        editButton.disabled = true;
        addButton.disabled = false;
        const [food, time, calories] = readInput();
        clearInput();
        await fetchPut(food, time, calories, idForEdit);
        await load();
    }

    // -- Http requests

    async function fetchGet() {
        const response = await fetch(baseUrl);
        const mealsObj = await response.json();
        const meals = Object.values(mealsObj);
        return Array.from(meals);
    }

    async function fetchPost(food, time, calories) {
        const data = { food, time, calories };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    async function fetchPut(food, time, calories, id) {
        const data = { food, time, calories, _id: id };
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
        const food = foodInput.value;
        const time = timeInput.value;
        const calories = caloriesInput.value;
        return [food, time, calories];
    }

    function setInput(food, time, calories) {
        foodInput.value = food;
        timeInput.value = time;
        caloriesInput.value = calories;
    }

    function clearInput() {
        setInput("", "", "");
    }

    function deconstructMealObject(meal) {
        const food = meal.food;
        const time = meal.time;
        const calories = meal.calories;
        const id = meal._id;
        return [food, time, calories, id];
    }

    
    // -- Html builders

    function buildMealDiv(food, time, calories, id) {
        const changeButton = buildHtmlElement("button", "Change", null, ["change-meal"]);
        const deleteButton = buildHtmlElement("button", "Delete", null, ["delete-meal"]);

        const foodH2 = buildHtmlElement("h2", food, null, null);
        const timeH3 = buildHtmlElement("h3", time, null, null);
        const caloriesH3 = buildHtmlElement("h3", calories, null, null);
        const buttonsDiv = buildHtmlElement("div", null, "meal-buttons", null, changeButton, deleteButton);

        const mealDiv = buildHtmlElement("div", null, null, ["meal"], foodH2, timeH3, caloriesH3, buttonsDiv);

        changeButton.addEventListener("click", () => {
            editButton.disabled = false;
            addButton.disabled = true;
            setInput(food, time, calories);
            idForEdit = id;
            mealDiv.remove();
        })

        deleteButton.addEventListener("click", async () => {
            await fetchDelete(id);
            await load();
        })

        return mealDiv;
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