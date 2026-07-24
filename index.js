import { displayLibrary } from "./UiController.js";
import { Library } from "./Library.js";
import { sampleData } from "./sample-data.js";
import { createValidator } from "./formValidation.js";
import { formController } from "./formController.js";

displayLibrary({
    sampleData,
    Library,
    formController: (...args) => formController(...args, createValidator),
});
