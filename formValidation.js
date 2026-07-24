export function addValidation(form) {
    form.addEventListener("submit", (e) => e.preventDefault());

    const getErrorTypeMessages = (input) => {
        const type = input.id;
        const COMMOM_ERRORS = {
            length: "incorrect length",
            empty: "must not be empty",
            size: `The input needs to be with ${input.minLength} to ${input.maxLength} characters`,
        };

        const ERROR_MESSAGES_BY_TYPE = {
            email: {
                ...COMMOM_ERRORS,
                type: "Invalid email format. Example code: example@mail.com",
            },
            password: {
                ...COMMOM_ERRORS,
                strength: "Password is to weak",
            },
            "repeat-password": {
                ...COMMOM_ERRORS,
                passwordMismatch: "The passwords need to match",
            },
            "postal-code": {
                ...COMMOM_ERRORS,
                length: "Invalid code format. Example code: 01234-567",
                pattern: `Wrong Format, example: 12345-123`,
            },
        };
        return ERROR_MESSAGES_BY_TYPE[type] || COMMOM_ERRORS;
    };

    const validateInput = (input, errorList) => {
        const { validity, value, dataset } = input;
        if ("empty" in errorList && value.trim() === "") {
            return "empty";
        }
        if (
            "size" in errorList &&
            (value.length > input.maxLength || value.length < input.minLength)
        ) {
            return "size";
        }
        if ("pattern" in errorList && validity.patternMismatch) {
            return "pattern";
        }
        if ("type" in errorList && validity.typeMismatch) {
            return "type";
        }
        if (
            "passwordMismatch" in errorList &&
            value !== document.querySelector(`#${dataset.matchId}`).value
        ) {
            return "passwordMismatch";
        }
        return null;
    };

    const getErrorDisplay = (input) => {
        const createErrorDisplay = (input) => {
            const errorMessageDisplay = document.createElement("div");
            errorMessageDisplay.classList.add("error");
            errorMessageDisplay.dataset.for = input.id;
            errorMessageDisplay.style.minWidth = `${input.getBoundingClientRect().width}px`;
            input.insertAdjacentElement("afterend", errorMessageDisplay);
            return errorMessageDisplay;
        };
        const display =
            form.querySelector(`[data-for=${input.id}]`) ||
            createErrorDisplay(input);
        return {
            open: (errorMessage) => {
                display.classList.add("visible");
                display.textContent = errorMessage;
            },
            close: () => {
                display.textContent = "";
                display.classList.remove("visible");
            },
        };
    };

    function handleValidation(input) {
        const errorDisplay = getErrorDisplay(input);
        const errorList = getErrorTypeMessages(input);
        const error = validateInput(input, errorList);
        if (!error) {
            errorDisplay.close();
            input.setCustomValidity("");
        } else {
            const errorMessage = errorList[error];
            input.setCustomValidity(errorMessage);
            errorDisplay.open(errorMessage);
        }
    }

    form.addEventListener("input", (e) => {
        if (e.target.closest("input")) handleValidation(e.target);
    });
    form.addEventListener("submit", (e) => {
        form.querySelectorAll("input").forEach((input) =>
            handleValidation(input),
        );
    });
}
