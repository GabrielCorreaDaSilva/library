export class Library {
    _books = [];

    constructor() {}

    get books() {
        return this._books;
    }

    addBookToLibrary(bookData) {
        const newBook = new Book({
            ...bookData,
            pages: Number(bookData.pages),
        });
        this._books.push(newBook);
        return newBook;
    }

    getBookId(id) {
        return this._books.findIndex((book) => book.id === id);
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
