window.addEventListener('load', solve);

function solve() {
    const genreInput = document.getElementById("genre");
    const nameInput = document.getElementById("name");
    const authorInput = document.getElementById("author");
    const dateInput = document.getElementById("date");
    const allHitsDiv = document.getElementsByClassName("all-hits-container")[0];
    const savedHitsDiv = document.getElementsByClassName("saved-container")[0];
    const likesP = document.querySelector(".likes p");
    const addButton = document.getElementById("add-btn");

    addButton.addEventListener("click", add);

    let totalLikes = 0;

    // -- Event handlers

    function add(e) {
        e.preventDefault();
        const [genre, name, author, date] = readInput();

        if (genre && name && author && date) {
            clearInput();
            const hitsInfoDiv = buildHitsInfoDiv(genre, name, author, date, false);
            allHitsDiv.appendChild(hitsInfoDiv);
        }
    }

    function like(e) {
        const likeButton = e.target;
        likeButton.disabled = true;
        likesP.textContent = `Total Likes: ${++totalLikes}`;
    }

    function save(e) {
        const allHitsDiv = e.target.parentElement;
        const [genre, name, author, date] = deconstructInfoDiv(allHitsDiv);
        const savedHitsInfo = buildHitsInfoDiv(genre, name, author, date, true);

        allHitsDiv.remove();
        savedHitsDiv.appendChild(savedHitsInfo);
    }

    function deleteHandler(e) {
        const containerDiv = e.target.parentElement;
        containerDiv.remove();
    }

    // -- Helper functions

    function readInput() {
        const genre = genreInput.value;
        const name = nameInput.value;
        const author = authorInput.value;
        const date = dateInput.value;
        return [genre, name, author, date];
    }

    function setInput(genre, name, author, date) {
        genreInput.value = genre;
        nameInput.value = name;
        authorInput.value = author;
        dateInput.value = date;
    }

    function clearInput() {
        setInput("", "", "", "");
    }

    function deconstructInfoDiv(infoDiv) {
        const children = Array.from(infoDiv.children);

        const genre = children[1].textContent.slice("Genre: ".length);
        const name = children[2].textContent.slice("Name: ".length);
        const author = children[3].textContent.slice("Author: ".length);
        const date = children[4].textContent.slice("Date: ".length);

        return [genre, name, author, date];
    }

    // -- Html builders

    function buildHitsInfoDiv(genre, name, author, date, isSavedHits) {
        const img = document.createElement("img");
        img.src = "./static/img/img.png";

        const genreH2 = buildHtmlElement("h2", `Genre: ${genre}`, null, null);
        const nameH2 = buildHtmlElement("h2", `Name: ${name}`, null, null);
        const authorH2 = buildHtmlElement("h2", `Author: ${author}`, null, null);
        const dateH3 = buildHtmlElement("h3", `Date: ${date}`, null, null);

        const deleteButton = buildHtmlElement("button", "Delete", null, ["delete-btn"]);
        deleteButton.addEventListener("click", deleteHandler);

        if (isSavedHits) {
            return buildHtmlElement(
                "div", null, null, ["hits-info"], img, genreH2, nameH2, authorH2, dateH3, deleteButton
            );    
        }        

        const saveButton = buildHtmlElement("button", "Save song", null, ["save-btn"]);
        const likeButton = buildHtmlElement("button", "Like song", null, ["like-btn"]);

        saveButton.addEventListener("click", save);
        likeButton.addEventListener("click", like);

        return buildHtmlElement(
            "div", null, null, ["hits-info"], img, genreH2, nameH2, authorH2, dateH3, saveButton, likeButton, deleteButton
        );
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