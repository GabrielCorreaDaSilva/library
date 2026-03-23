const myLibrary = [];
const newBooks = [{
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
},
{
    name: "Brave New World",
    autor: "Aldous Huxley",
    description: "A futuristic society driven by technology and conditioning where individuality is suppressed.",
    pages: 311,
    publishDate: "1932-08-30",
    entryDate: "2026-03-21"
},
{
    name: "Fahrenheit 451",
    autor: "Ray Bradbury",
    description: "In a world where books are banned, a fireman begins to question the system he enforces.",
    pages: 194,
    publishDate: "1953-10-19",
    entryDate: "2026-03-21"
},
{
    name: "The Catcher in the Rye",
    autor: "J.D. Salinger",
    description: "A teenager recounts his experiences in New York City after being expelled from school.",
    pages: 234,
    publishDate: "1951-07-16",
    entryDate: "2026-03-21"
},
{
    name: "Moby-Dick",
    autor: "Herman Melville",
    description: "A sailor narrates the obsessive quest of a captain hunting a legendary white whale.",
    pages: 635,
    publishDate: "1851-10-18",
    entryDate: "2026-03-21"
},
{
    name: "The Great Gatsby",
    autor: "F. Scott Fitzgerald",
    description: "A mysterious millionaire's pursuit of love reveals the emptiness of the American Dream.",
    pages: 180,
    publishDate: "1925-04-10",
    entryDate: "2026-03-21"
}]

//loads sample book data
newBooks.map(book => addBookToLibrary({ ...book }));

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
    return newBook;
}

const getBookId = (id) => myLibrary.findIndex(book => book.id === id);

const removeBook = (id) => myLibrary.splice(getBookId(id), 1);

function displayBook(content, newBook, row = null) {
    const isNew = !row;
    row ||= document.createElement("tr");
    row.setAttribute("data-id", newBook.id);
    row.innerHTML = `
        <td headers="name">${newBook.name}</td>
        <td headers="autor">${newBook.autor}</td>
        <td headers="description">${newBook.description}</td>
        <td headers="pages">${newBook.pages}</td>
        <td headers="publishDate">${newBook.publishDate}</td>
        <td headers="entryDate">${newBook.entryDate}</td>
        <td headers="read">${newBook.read === true ? "Yes" : "No"} <button class="read-change">Change</button> </td>
        <td headers="delete"><button class="delete">X</button></td>
        `;
    if (isNew) content.appendChild(row);
}

function displayLibrary() {
    const library = document.querySelector(".library");
    // if (library.textContent) {
    //     library.textContent = '';
    // }
    // console.log(library);
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
    body.replaceChildren();
    myLibrary.forEach(e => {
        displayBook(body, e);
    });
    library.appendChild(head);
    library.appendChild(body);
    return body;
}

const libraryTable = document.querySelector(".library");
libraryTable.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete")) {
        const row = e.target.closest("tr");
        removeBook(row.dataset.id);
        e.target.closest("tr").remove();
    }

    if (e.target.classList.contains("read-change")) {
        const row = e.target.closest("tr");
        const book = myLibrary[getBookId(row.dataset.id)];
        book.changeReadStatus();
        displayBook(content, book, row);
    }
});

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
    const newBook = addBookToLibrary(data);
    displayBook(content, newBook);
    dialog.close();
});

