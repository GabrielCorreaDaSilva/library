export function formController(body, library, createValidator) {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const showButton = document.querySelector(".new-book");
    const closeButton = document.querySelector("#close");
    const validator = createValidator(form);

    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        validator.validateEveryInputInForm();
        if (!form.checkValidity()) return;
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const newBook = library.addBookToLibrary(data);
        library.displayBook(body, newBook);
        dialog.close();
    });
    form.addEventListener("input", (e) => {
        e.preventDefault();
        form.querySelectorAll(
            "input[type=text],input[type=date],input[type=number], textarea",
        ).forEach(validator.validateInput);
    });
}
