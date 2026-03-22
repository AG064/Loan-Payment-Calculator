import { State } from "./state.js";
import { View } from "./view.js";

export class Controller {
    constructor() {
        this.state = new State();
        this.view = new View();
    }
}