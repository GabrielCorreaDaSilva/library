export function displayLibrary({
    sampleData,
    addValidation,
    Library,
    formController,
}) {
    const bookList = document.querySelector(".library");
    const library = new Library();
    if (sampleData) {
        sampleData.forEach(book => library?.addBookToLibrary(book));
    }
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
    library.books.forEach((e) => {
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
    formController(body, library, addValidation);
}
