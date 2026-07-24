export function formController(body, library) {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const showButton = document.querySelector(".new-book");
    const closeButton = document.querySelector("#close");

    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const newBook = library.addBookToLibrary(data);
        library.displayBook(body, newBook);
        dialog.close();
    });
}
