//window.addEventListener("load", solve);

function solve() {
    const titleInput = document.getElementById("task-title");
    const categoryInput = document.getElementById("task-category");
    const contentInput = document.getElementById("task-content");
    const publishButton = document.getElementById("publish-btn");
    const reviewUl = document.getElementById("review-list");
    const publishedUl = document.getElementById("published-list");

    publishButton.addEventListener("click", publish);

    function publish() {
        const [title, category, content] = readInput();
        if (title && category && content) {
            clearInput();
            const reviewPostLi = buildReviewLi(title, category, content);
            reviewUl.appendChild(reviewPostLi);
        }
    }

    function readInput() {
        const title = titleInput.value;
        const category = categoryInput.value;
        const content = contentInput.value;
        return [title, category, content];
    }

    function setInput(title, category, content) {
        titleInput.value = title;
        categoryInput.value = category;
        contentInput.value = content;
        return [title, category, content];
    }

    function clearInput() {
        setInput("", "", "");
    }


    function buildReviewLi(title, category, content) {
        const article = buildArticle(title, category, content);
        const editButton = buildHtmlElement("button", "Edit", null, ["action-btn", "edit"]);
        const postbutton = buildHtmlElement("button", "Post", null, ["action-btn", "post"]);

        const li = buildHtmlElement("li", null, null, ["rpost"], article, editButton, postbutton);

        editButton.addEventListener("click", () => {
            li.remove();
            setInput(title, category, content);
        });

        postbutton.addEventListener("click", () => {
            li.remove();
            const article = buildArticle(title, category, content);
            const publishedLi = buildHtmlElement("li", null, null, ["rpost"], article);
            publishedUl.appendChild(publishedLi);
        });

        return li;
    }

    function buildArticle(title, category, content) {
        const titleH4 = buildHtmlElement("h4", title, null, null);
        const categoryP = buildHtmlElement("p", `Category: ${category}`, null, null);
        const contentP = buildHtmlElement("p", `Content: ${content}`, null, null);

        const article = buildHtmlElement("article", null, null, null, titleH4, categoryP, contentP);
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