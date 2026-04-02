import { sampleData } from "./sample-data.js";

class Library {
    _books = [];

    constructor() { sampleData.forEach(book => this.addBookToLibrary({ ...book })); }

    get books() {
        return this._books;
    }

    addBookToLibrary(bookData) {
        const newBook = new Book({
            ...bookData,
            pages: Number(bookData.pages)
        });
        this._books.push(newBook);
        return newBook;
    }

    getBookId(id) {
        return this._books.findIndex(book => book.id === id);
    }
    getBook(id) {
        return this._books[this.getBookId(id)];
    }

    removeBook(id) {
        return this._books.splice(this.getBookId(id), 1);
    }

    displayBook(content, newBook, row = null) {
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

}

class Book {
    constructor({ name, autor, description, pages, publishDate, entryDate }) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.autor = autor;
        this.description = description;
        this.pages = pages;
        this.publishDate = publishDate;
        this.entryDate = entryDate;
        this.read = false;
    }

    changeReadStatus() {
        this.read = !this.read;
    }
}

function displayLibrary() {
    const bookList = document.querySelector(".library");
    const library = new Library();
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
    library.books.forEach(e => {
        library.displayBook(body, e);
    });
    bookList.appendChild(head);
    bookList.appendChild(body);
    const libraryTable = document.querySelector(".library");
    libraryTable.addEventListener("click", (e) => {

        if (e.target.classList.contains("delete")) {
            const row = e.target.closest("tr");
            library.removeBook(row.dataset.id);
            e.target.closest("tr").remove();
        }

        if (e.target.classList.contains("read-change")) {
            const row = e.target.closest("tr");
            const book = library.getBook(row.dataset.id);
            book.changeReadStatus();
            library.displayBook(body, book, row);
        }
    });
    formController(body, library);
}

function formController(body, library) {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form")
    const showButton = document.querySelector(".new-book");
    const closeButton = document.querySelector("#close");

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
        const newBook = library.addBookToLibrary(data);
        library.displayBook(body, newBook);
        dialog.close();
    });
}

displayLibrary();


