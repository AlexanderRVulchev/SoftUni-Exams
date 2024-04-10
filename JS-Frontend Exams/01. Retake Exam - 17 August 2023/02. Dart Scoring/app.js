window.addEventListener("load", solve);

function solve() {
  const playerInput = document.getElementById("player");
  const scoreInput = document.getElementById("score");
  const roundInput = document.getElementById("round");
  const addButton = document.getElementById("add-btn");
  const sureListUl = document.getElementById("sure-list");
  const scoreboardUl = document.getElementById("scoreboard-list");
  const clearButton = document.getElementsByClassName("clear")[0];

  addButton.addEventListener("click", add);
  clearButton.addEventListener("click", clear);

  function add() {
    const [player, score, round] = readInput();
    if (player && score && round) {
      clearInput();
      const dartItem = buildDartItem(player, score, round);
      sureListUl.appendChild(dartItem);
      addButton.disabled = true;
    }
  }

  function readInput() {
    const player = playerInput.value;
    const score = scoreInput.value;
    const round = roundInput.value;
    return [player, score, round];
  }

  function setInput(player, score, round) {
    playerInput.value = player;
    scoreInput.value = score;
    roundInput.value = round;
  }

  function clearInput() {
    setInput("", "", "", "");
  }

  function buildDartItem(player, score, round) {
    const article = buildArticleElement(player, score, round);
    const editButton = buildHtmlElement("button", "edit", null, ["btn", "edit"]);
    const okButton = buildHtmlElement("button", "ok", null, ["btn", "ok"]);
    const li = buildHtmlElement("li", null, null, ["dart-item"], article, editButton, okButton);

    editButton.addEventListener("click", () => {
      setInput(player, score, round);
      li.remove();
      addButton.disabled = false;
    })

    okButton.addEventListener("click", () => {
      li.remove();
      const article = buildArticleElement(player, score, round);
      const dartItem = buildHtmlElement("li", null, null, ["dart-item"], article);
      scoreboardUl.appendChild(dartItem);
      addButton.disabled = false;
    })

    return li;
  }

  function clear() {
    location.reload();
  }

  function buildArticleElement(player, score, round) {
    const playerP = buildHtmlElement("p", player, null, null);
    const scoreP = buildHtmlElement("p", `Score: ${score}`, null, null);
    const roundP = buildHtmlElement("p", `Round: ${round}`, null, null);
    const article = buildHtmlElement("article", null, null, null, playerP, scoreP, roundP);
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