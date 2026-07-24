import { displayLibrary } from "./UiController.js";
import { Library } from "./Library.js";
import { sampleData } from "./sample-data.js";
import { addValidation } from "./formValidation.js";
import { formController } from "./formController.js";

displayLibrary({
    sampleData,
    addValidation,
    Library,
    formController,
});
