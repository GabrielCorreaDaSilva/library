const myLibrary = [];

// test----------------------------------------------
const testData = [{
    name: "1984",
    autor: "George Orwell",
    description: "A dystopian society under constant surveillance where independent thought is forbidden.",
    pages: 328,
    publishDate: "1949-06-08",
    entryDate: "2026-03-21"
},
{
    name: "The Hobbit",
    autor: "J.R.R. Tolkien",
    description: "A hobbit embarks on an unexpected journey to help reclaim a lost kingdom from a dragon.",
    pages: 310,
    publishDate: "1937-09-21",
    entryDate: "2026-03-21"
},
{
    name: "To Kill a Mockingbird",
    autor: "Harper Lee",
    description: "A young girl witnesses racial injustice in the American South through her father's legal defense.",
    pages: 281,
    publishDate: "1960-07-11",
    entryDate: "2026-03-21"
}];

test = () => console.log(myLibrary, testData);
//---------------------------------------------------
function Book({ name, autor, description, pages, publishDate, entryDate }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.autor = autor;
    this.description = description;
    this.pages = pages;
    this.publishDate = publishDate;
    this.entryDate = entryDate;
    this.read = false;
}

Book.prototype.changeReadStatus = function () {
    this.read = !this.read;
}


function addBookToLibrary(bookData) {
    const newBook = new Book({
        ...bookData,
        pages: Number(bookData.pages)
    });
    myLibrary.push(newBook);
}

const getBookId = (id) => myLibrary.findIndex(book => book.id === id);

const removeBook = (id) => myLibrary.splice(getBookId(id), 1);

function updateContent(body = document.querySelector("tbody")) {
    body.replaceChildren();
    myLibrary.forEach(e => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", e.id);
        row.innerHTML = `
        <td headers="name">${e.name}</td>
        <td headers="autor">${e.autor}</td>
        <td headers="description">${e.description}</td>
        <td headers="pages">${e.pages}</td>
        <td headers="publishDate">${e.publishDate}</td>
        <td headers="entryDate">${e.entryDate}</td>
        <td headers="read">${e.read === true ? "Yes" : "No"}( <button class="readChange">Change</button> )</td>
        <td headers="delete"><button class="delete">X</button></td>
        
        `;
        body.appendChild(row);
        const changeReadBtn = row.querySelector(".readChange");
        changeReadBtn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            myLibrary[getBookId(row.dataset.id)].changeReadStatus();
            updateContent();
        });

        const delBtn = row.querySelector(".delete");
        delBtn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            removeBook(row.dataset.id);
            e.target.closest("tr").remove();
        });
    });
}

function displayLibrary() {
    const library = document.querySelector(".library-table-container");
    if (library.textContent) {
        library.textContent = '';
    }
    console.log(library);
    const head = document.createElement("thead");
    head.innerHTML = `
    <tr>
        <th id="name">Name</th>
        <th id="autor">Autor</th>
        <th id="description">Sinopse</th>
        <th id="pages">Pages</th>
        <th id="publishDate">Publish Date</th>
        <th id="entryDate">Entry Date</th>
        <th id="read">Read</th>
        <th id="delete"></th> 
    </tr>`;
    const body = document.createElement("tbody");
    updateContent(body);
    library.appendChild(head);
    library.appendChild(body);
    return body;
}

//test
testData.forEach(item => addBookToLibrary(item));

const content = displayLibrary();

const dialog = document.querySelector("dialog");
const form = document.querySelector("form")
const showButton = document.querySelector(".new-book");
const closeButton = document.querySelector("#close");
const confirmButton = document.querySelector("#confirm");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
    addBookToLibrary(data);
    updateContent(content);
    dialog.close();
});

