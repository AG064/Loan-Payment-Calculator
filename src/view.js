export class View {
    app = document.querySelector("#app");

    clear() {
        this.app.innerHTML = "";
    }

    renderIntro() {
        this.clear();
        document.querySelector("#nav-container").classList.add("hidden");

        const title = document.createElement("h2");
        title.textContent = "Welcome to OrangeBank";

        const btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "start";
        btn.textContent = "Start application";

        this.app.append(title, btn);
    }

    renderStep1(state) {
        this.clear();
        document.querySelector("#next").disabled = false;
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Employment status";

        const options = [
            { value: "employed", label: "Employed" },
            { value: "self-employed", label: "Self-employed" },
            { value: "unemployed", label: "Unemployed" }
        ];

        this.app.appendChild(title);

        options.forEach((opt, index) => {
            const label = document.createElement("label");
            label.className = "radio-label";

            label.setAttribute("for", "emp-" + index);
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "employment";
            input.id = "emp-" + index;
            input.value = opt.value;

            if (state?._employmentStatus === opt.value) {
                input.checked = true;
            }

            const customCircle = document.createElement("span");
            customCircle.className = "radio-custom";

            label.append(input, customCircle, opt.label);
            this.app.appendChild(label);
        });
    }

    renderStep2(state) {
        this.clear();
        document.querySelector("#next").disabled = false;
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Loan details";

        // income
        const income = document.createElement("select");
        income.id = "income";
        income.className = "form-control";

        ["<1000€", "1000–2000€", ">2000€"].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val;

            if (state?._income == val) option.selected = true;

            income.appendChild(option);
        });

        // loan amount
        const loan = document.createElement("input");
        loan.className = "form-control";
        loan.type = "number";
        loan.id = "loanAmount";
        loan.placeholder = "Loan amount";
        loan.value = state?._loanAmount ?? "";

        // period
        const period = document.createElement("select");
        period.id = "loanPeriod";
        period.className = "form-control";


        [12, 24, 36].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val + " months";

            if (state?._loanPeriod == val) option.selected = true;

            period.appendChild(option);
        });

        // interest
        const rate = document.createElement("select");
        rate.id = "interestRate";
        rate.className = "form-control";

        [5, 10, 15].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val + "%";

            if (state?._interestRate == val) option.selected = true;

            rate.appendChild(option);
        });

        // payment
        const payment = document.createElement("p");

        const text = document.createTextNode("Monthly: ");

        const span = document.createElement("span");
        span.id = "monthlyPayment";
        span.textContent = "0";

        const euro = document.createTextNode(" €");

        payment.append(text, span, euro);

        this.app.append(title, income, loan, period, rate, payment);
    }

    renderStep3() {
        this.clear();
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Terms & Privacy";

        const nextBtn = document.querySelector("#next");
        nextBtn.disabled = true;

        const textBox = document.createElement("div");
        textBox.className = "terms-text";

        textBox.innerHTML = `
            <p>Welcome to Swedbank loan service.</p>

            <p>By continuing, you agree that:</p>
            <ul>
            <li>Your data may be processed</li>
            <li>You accept privacy policy</li>
            <li>Information is accurate</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at est dapibus, gravida ipsum sit amet, luctus urna. Nulla eu tincidunt tortor, at viverra tellus. In id aliquet orci. Aenean ac venenatis leo, in rhoncus est. Duis sem sem, convallis at dui quis, posuere mattis risus. Suspendisse nisi arcu, viverra non purus sed, accumsan euismod dui. Mauris posuere iaculis ex, sit amet mollis sem cursus dignissim. Proin imperdiet viverra orci eget rhoncus. Nullam vulputate iaculis diam sed bibendum. Proin lacus eros, porttitor non elementum in, pulvinar eu nisi. Maecenas id dolor ante.

Fusce leo odio, condimentum in cursus ut, pharetra id libero. Vestibulum ut lacus facilisis, imperdiet ante eget, consequat libero. Duis sagittis, tellus eu iaculis euismod, enim nisl sagittis neque, a sodales lorem neque ut mauris. Donec non efficitur nisl, non aliquam purus. Vestibulum porta nunc ligula, in tristique eros ultrices vitae. Praesent accumsan nec mauris ac convallis. Sed condimentum est vel nibh efficitur condimentum. Maecenas iaculis molestie lorem, at rutrum elit sodales nec. In consectetur pretium lacus, sed malesuada urna imperdiet eu. Cras blandit enim sed odio ultrices, vel vehicula leo consectetur.

Pellentesque mattis elementum augue ac fringilla. Nullam in leo sed orci tristique elementum. Nullam varius erat at ipsum interdum, eu aliquam sem venenatis. Praesent fermentum rutrum velit, nec aliquam tortor semper eu. Nunc non pretium eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ultrices sagittis justo congue efficitur. Maecenas consequat viverra tellus a blandit. Ut iaculis dictum nulla quis blandit. Integer mattis vulputate consectetur.

Donec sit amet interdum nibh. Quisque viverra, erat sed tempor convallis, sem elit tempus neque, finibus sagittis est tortor quis libero. Maecenas eu nulla tellus. Sed eu rutrum quam. Sed consectetur metus eu augue hendrerit, sit amet placerat ipsum ornare. Proin fermentum interdum est, nec tincidunt enim. Quisque accumsan mauris justo, eu finibus leo congue ut. In placerat pulvinar lacinia. Aliquam in augue dictum, pretium metus ac, rutrum enim. Etiam ullamcorper magna diam, ut ultrices nibh convallis vitae. Fusce a feugiat nulla, et cursus diam.

Nulla ultricies, risus eu dictum cursus, orci dolor finibus enim, sit amet semper risus nisi sed libero. Curabitur aliquet quam lacus, quis porta orci finibus sit amet. Praesent ac congue purus, quis tempor nulla. Phasellus in viverra felis. Ut consectetur nibh quis lectus molestie, quis bibendum neque condimentum. Praesent sed erat a libero dapibus maximus vel in nibh. Morbi accumsan ultricies odio id gravida. Donec eget purus finibus lectus laoreet molestie.</p> 
        `;

        const checkboxLabel = document.createElement("label");
        checkboxLabel.className = "checkbox-label";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "accept-checkbox";
        checkboxLabel.append(checkbox, " I accept Terms & Privacy");

        const checkboxLabelEmail = document.createElement("label");
        checkboxLabelEmail.className = "checkbox-label";
        const checkboxEmail = document.createElement("input");
        checkboxEmail.type = "checkbox";
        checkboxEmail.id = "recive-offers";
        checkboxLabelEmail.append(checkboxEmail, "I agree to receive offers (optional)");

        this.app.append(title, textBox, checkboxLabel, checkboxLabelEmail);
    }

    renderEmailField(state) {
        const emailField = document.createElement("input")

        emailField.type = "string";
        emailField.id = "email-notifiations";
        emailField.placeholder = "Email";
        emailField.value = state?._userEmail ?? "";
    }

    allowAccept() {
        const checkbox = document.querySelector("#accept-checkbox");
        const nextBtn = document.querySelector("#next");
        if (checkbox && nextBtn) {
        nextBtn.disabled = !checkbox.checked;
        }
    }


    renderStep4() {
        this.clear();
        document.querySelector("#nav-container").classList.remove("hidden");
        document.querySelector("#next").disabled = false;
        const title = document.createElement("h2");
        title.textContent = "Additional info";

        const textarea = document.createElement("textarea");
        textarea.id = "additionalInfo";
        textarea.className = "form-control";
        textarea.placeholder = "Anything else you want to add?";

        this.app.append(title, textarea);
    }

    renderSummary(state, payment) {
        this.clear();
        document.querySelector("#nav-container").classList.add("hidden");

        const title = document.createElement("h2");
        title.textContent = "Summary";

        const data = [
            `Employment: ${state._employmentStatus}`,
            `Income: ${state._income}`,
            `Loan: ${state._loanAmount}`,
            `Period: ${state._loanPeriod}`,
            `Rate: ${state._interestRate}`,
            `Monthly: ${payment.toFixed(2)} €`
        ];

        const list = document.createElement("div");

        data.forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            list.appendChild(p);
        });

        const btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "back-to-intro";
        btn.textContent = "Back To Intro";

        this.app.append(title, list, btn);
    }

    getStep1Data() {
    return {
            employmentStatus: document.querySelector("input[name='employment']:checked")?.value
        };
    }

    getStep2Data() {
        return {
            income: document.querySelector("#income")?.value,
            loanAmount: document.querySelector("#loanAmount")?.value,
            loanPeriod: document.querySelector("#loanPeriod")?.value,
            interestRate: document.querySelector("#interestRate")?.value
        };
    }

    getStep3Data() {
        const checked = [...document.querySelectorAll("input[type='checkbox']:checked")];
        return { consents: checked.map(el => el.value) };
    }

    getStep4Data() {
        return {
            additionalInfo: document.querySelector("#additionalInfo")?.value
        };
    }

    
    updatePayment(value) {
        const el = document.querySelector("#monthlyPayment");
        if (el) el.textContent = value.toFixed(2);
    }

    
    showError(msg) {
        this.clearError();

        const errorDiv = document.createElement("div");
        errorDiv.className = "error-msg";
        errorDiv.id = "app-error";
        errorDiv.textContent = msg;

        this.app.appendChild(errorDiv);
    }

    clearError() {
        const existingError = document.querySelector("#app-error");
        if (existingError) {
            existingError.remove();
        }
    }
}