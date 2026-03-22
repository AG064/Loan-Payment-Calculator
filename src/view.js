export class View {

    renderStep1() {
        const app = document.querySelector("#app");

        const title = document.createElement("h1");
        title.innerText = "Employment";
        app.appendChild(title);
        
        const employed = document.createElement("input");
        employed.
    }

    render(container) {
        container.innerHTML = this.renderIntro();
    }
}