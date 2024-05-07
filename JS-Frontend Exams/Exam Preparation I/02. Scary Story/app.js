window.addEventListener("load", solve);

function solve() {
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const ageInput = document.getElementById("age");
  const titleInput = document.getElementById("story-title");
  const genreSelect = document.getElementById("genre");
  const storyInput = document.getElementById("story");
  const publishButton = document.getElementById("form-btn");
  const previewUl = document.getElementById("preview-list");

  publishButton.addEventListener("click", publish);

  // -- Event handlers

  function publish() {
    const [firstName, lastName, age, title, genre, story] = readInput();
    clearInput();

    if (firstName && lastName && age && title && genre && story) {
      const storyLi = buildStoryLi(firstName, lastName, age, title, genre, story);
      previewUl.appendChild(storyLi);
  
      publishButton.disabled = true;
    }
  }

  function edit() {
    const liElement = document.getElementsByClassName("story-info")[0];
    const [firstName, lastName, age, title, genre, story] = deconstructLiElement(liElement);    
    liElement.remove();

    publishButton.disabled = false;
    setInput(firstName, lastName, age, title, genre, story);
  }

  function deleteHandler() {
    const liElement = document.getElementsByClassName("story-info")[0];
    liElement.remove();
    publishButton.disabled = false;
  }

  function save() {
    const main = document.getElementById("main");
    main.innerHTML = "<h1>Your scary story is saved!</h1>";
  }

  // -- Helper functions

  function readInput() {
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const age = ageInput.value;
    const title = titleInput.value;
    const genre = genreSelect.value;
    const story = storyInput.value;
    return [firstName, lastName, age, title, genre, story];
  }

  function setInput(firstName, lastName, age, title, genre, story) {
    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    ageInput.value = age;
    titleInput.value = title;
    genreSelect.value = genre;
    storyInput.value = story;
  }

  function clearInput() {
    setInput("", "", "", "", "", "");    
  }

  function deconstructLiElement(li) {
    const article = li.getElementsByTagName("article")[0];
    const storyHtmlElements = Array.from(article.children);

    const names = storyHtmlElements[0].textContent.slice("Name: ".length);
    const [firstName, lastName] = names.split(" ");
    const age  = storyHtmlElements[1].textContent.slice("Age: ".length);
    const title = storyHtmlElements[2].textContent.slice("Title: ".length);
    const genre = storyHtmlElements[3].textContent.slice("Genre: ".length);
    const story = storyHtmlElements[4].textContent;

    return [firstName, lastName, age, title, genre, story];
  }


  // -- Html builders

  function buildStoryLi(firstName, lastName, age, title, genre, story) {
    const nameH4 = buildHtmlElement("h4", `Name: ${firstName} ${lastName}`, null, null);
    const ageP = buildHtmlElement("p", `Age: ${age}`, null, null);
    const titleP = buildHtmlElement("p", `Title: ${title}`, null, null);
    const genreP = buildHtmlElement("p", `Genre: ${genre}`, null, null);
    const storyP = buildHtmlElement("p", story, null, null);

    const article = buildHtmlElement("article", null, null, null, nameH4, ageP, titleP, genreP, storyP);
    const saveButton = buildHtmlElement("button", "Save Story", null, ["save-btn"]);
    const editButton = buildHtmlElement("button", "Edit Story", null, ["edit-btn"]);
    const deleteButton = buildHtmlElement("button", "Delete Story", null, ["delete-btn"]);

    saveButton.addEventListener("click", save);
    editButton.addEventListener("click", edit);
    deleteButton.addEventListener("click", deleteHandler);

    const li = buildHtmlElement("li", null, null, ["story-info"], article, saveButton, editButton, deleteButton);
    return li;
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