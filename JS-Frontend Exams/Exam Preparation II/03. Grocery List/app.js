function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/grocery/";

    const nameInput = document.getElementById("product");
    const countInput = document.getElementById("count");
    const priceInput = document.getElementById("price");
    const addButton = document.getElementById("add-product");
    const updateButton = document.getElementById("update-product");
    const loadButton = document.getElementById("load-product");
    const tbody = document.getElementById("tbody");

    loadButton.addEventListener("click", load);
    addButton.addEventListener("click", add);
    updateButton.addEventListener("click", submit);


    // -- Event handlers

    async function load(e) {
        if (e) {
            e.preventDefault();
        }

        tbody.innerHTML = "";
        const products = await fetchAllProducts();

        for (const product of products) {
            const [name, count, price, id] = deconstructProductObject(product);
            const newTr = buildTrElement(name, count, price, id);
            tbody.appendChild(newTr);
        }
    }

    async function add(e) {
        e.preventDefault();
        const [name, count, price] = readInput();

        const data = { product: name, count, price };
        await fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data)
        });

        await load();
    }

    async function deleteHandler(e) {
        const id = e.target.id;
        await fetch(baseUrl + id, {
            method: "DELETE"
        });

        await load();
    }

    async function update(e) {
        const id = e.target.id;
        const products = await fetchAllProducts();
        const product = products.find(p => p._id === id);

        const [name, count, price, _] = deconstructProductObject(product);
        setInput(name, count, price);

        addButton.disabled = true;
        updateButton.disabled = false;
        updateButton.setAttribute("edit-id", id);
    }

    async function submit(e) {
        updateButton.disabled = true;
        addButton.disabled = false;

        const id = updateButton.getAttribute("edit-id");
        const [name, count, price] = readInput();
        const data = { product: name, count, price };

        await fetch(baseUrl + id, {
            method: "PATCH",
            body: JSON.stringify(data)
        })

        await load();
    }


    // -- Helper functions

    async function fetchAllProducts() {
        const response = await fetch(baseUrl);
        const productsObj = await response.json();
        const products = Object.values(productsObj);
        return Array.from(products);
    }

    function deconstructProductObject(product) {
        const name = product.product;
        const count = product.count;
        const price = product.price;
        const id = product._id;
        return [name, count, price, id];
    }

    function readInput() {
        const name = nameInput.value;
        const count = countInput.value;
        const price = priceInput.value;
        return [name, count, price];
    }

    function setInput(name, count, price) {
        nameInput.value = name;
        countInput.value = count;
        priceInput.value = price;
    }

    
    // - Html builders

    function buildTrElement(name, count, price, id) {
        const updateBtn = buildHtmlElement("button", "Update", id, ["update"]);
        const deleteBtn = buildHtmlElement("button", "Delete", id, ["delete"]);

        deleteBtn.addEventListener("click", deleteHandler);
        updateBtn.addEventListener("click", update);

        const nameTd = buildHtmlElement("td", name, null, ["name"]);
        const countTd = buildHtmlElement("td", count, null, ["count-product"]);
        const priceTd = buildHtmlElement("td", price, null, ["product-price"]);
        const buttonsTd = buildHtmlElement("td", null, null, ["btn"], updateBtn, deleteBtn);

        const tr = buildHtmlElement("tr", null, null, null, nameTd, countTd, priceTd, buttonsTd);
        return tr;
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