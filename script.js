const myLibrary = [
    {
        id: crypto.randomUUID(),
        name: "1984",
        autor: "George Orwell",
        description: "A dystopian society under constant surveillance where independent thought is forbidden.",
        pages: 328,
        publishDate: "1949-06-08",
        entryDate: "2026-03-21"
    },
    {
        id: crypto.randomUUID(),
        name: "The Hobbit",
        autor: "J.R.R. Tolkien",
        description: "A hobbit embarks on an unexpected journey to help reclaim a lost kingdom from a dragon.",
        pages: 310,
        publishDate: "1937-09-21",
        entryDate: "2026-03-21"
    },
    {
        id: crypto.randomUUID(),
        name: "To Kill a Mockingbird",
        autor: "Harper Lee",
        description: "A young girl witnesses racial injustice in the American South through her father's legal defense.",
        pages: 281,
        publishDate: "1960-07-11",
        entryDate: "2026-03-21"
    }
];

function Book(name, autor, description, pages, publishDate, entryDate) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.autor = autor;
    this.description = description;
    this.pages = pages;
    this.publishDate = publishDate;
    this.entryDate = entryDate;
}

function addBookToLibrary(name, autor, description, pages, publishDate, entryDate) {
    const newBook = new Book(name, autor, description, pages, publishDate, entryDate);
    myLibrary.push(newBook);
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
    </tr>`;
    const body = document.createElement("tbody");
    myLibrary.forEach(e => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td headers="name">${e.name}</td>
        <td headers="autor">${e.autor}</td>
        <td headers="description">${e.description}</td>
        <td headers="pages">${e.pages}</td>
        <td headers="publishDate">${e.publishDate}</td>
        <td headers="entryDate">${e.entryDate}</td>`;
        body.appendChild(row);
    });
    library.appendChild(head);
    library.appendChild(body);
}