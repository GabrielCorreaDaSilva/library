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
        const targets = form.querySelectorAll("input[type=text],input[type=date],input[type=number], textarea");
        targets.forEach(validator.validateInput);
        if (!form.checkValidity()) return;
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const newBook = library.addBookToLibrary(data);
        library.displayBook(body, newBook);
        dialog.close();
    });
    form.addEventListener("input", (e) => {
        const target = e.target.closest(
            "input[type=text],input[type=date],input[type=number], textarea",
        );
        if (target) {
            validator.validateInput(target);
        }
    });
}
