//window.addEventListener("load", solve);

function solve() {
  const studentInput = document.getElementById("student");
  const universityInput = document.getElementById("university");
  const scoreInput = document.getElementById("score");
  const nextButton = document.getElementById("next-btn");
  const previewUl = document.getElementById("preview-list");
  const candidatesUl = document.getElementById("candidates-list");

  nextButton.addEventListener("click", add);

  function add() {
    const [student, university, score] = readInput();
    if (student && university && score) {
      clearInput();
      const applicationLi = buildApplicationLi(student, university, score);
      previewUl.appendChild(applicationLi);
      nextButton.disabled = true;
    }
  }

  function readInput() {
    const student = studentInput.value;
    const university = universityInput.value;
    const score = scoreInput.value;
    return [student, university, score];
  }

  function setInput(student, university, score) {
    studentInput.value = student;
    universityInput.value = university;
    scoreInput.value = score;
  }

  function clearInput() {
    setInput("", "", "");
  }

  function buildApplicationLi(student, university, score) {
    const article = buildArticle(student, university, score);
    const editButton = buildHtmlElement("button", "edit", null, ["action-btn", "edit"]);
    const applyButton = buildHtmlElement("button", "apply", null, ["action-btn", "apply"]);

    const applicationLi = buildHtmlElement("li", null, null, ["application"], article, editButton, applyButton);

    editButton.addEventListener("click", () => {
      nextButton.disabled = false;
      setInput(student, university, score);
      applicationLi.remove();
    });

    applyButton.addEventListener("click", () => {
      applicationLi.remove();
      const article = buildArticle(student, university, score);
      const li = buildHtmlElement("li", null, null, ["application"], article);
      candidatesUl.appendChild(li);
      nextButton.disabled = false;
    })

    return applicationLi;
  }

  function buildArticle(student, university, score) {
    const studentH4 = buildHtmlElement("h4", student, null, null);
    const universityP = buildHtmlElement("p", `University: ${university}`, null, null);
    const scoreP = buildHtmlElement("p", `Score: ${score}`, null, null);

    const article = buildHtmlElement("article", null, null, null, studentH4, universityP, scoreP);
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
