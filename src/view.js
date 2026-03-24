import { calculateMonthlyPayment} from "./calculator.js";
export class View {
    app = document.querySelector("#app");

    clear() {
        this.app.innerHTML = "";

        this.app.classList.remove("fade-in");
        // trigger reflow to restart animation
        void this.app.offsetWidth;
        this.app.classList.add("fade-in");
    }

    renderIntro() {
        this.clear();
        document.querySelector("#nav-container").classList.add("hidden");

        const title = document.createElement("h2");
        title.textContent = "Welcome to OrangeBank";

        const desc = document.createElement("p");
        desc.textContent = "Apply for a personal loan in just a few simple steps. Fill in your details, review the terms, and get an instant monthly payment estimate.";

        const btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "start";
        btn.textContent = "Start application";

        this.app.append(title, desc, btn);
    }

    renderStep1(state) {
        this.clear();
        document.querySelector("#next").disabled = false;
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Employment status";

        const options = [
            { value: "employed", label: "Employed", id: "employment-employed" },
            { value: "self-employed", label: "Self-employed", id: "employment-self-employed" },
            { value: "unemployed", label: "Unemployed", id: "employment-unemployed" }
        ];

        this.app.appendChild(title);

        options.forEach((opt) => {
            const label = document.createElement("label");
            label.htmlFor = opt.id;
            label.className = "radio-label";

            const input = document.createElement("input");
            input.type = "radio";
            input.id = opt.id;
            input.name = "employment";
            input.value = opt.value;

            if (state?.employmentStatus === opt.value) {
                input.checked = true;
            }

            const customCircle = document.createElement("span");
            customCircle.className = "radio-custom";

            label.append(input, customCircle, opt.label);
            this.app.appendChild(label);
        });

        this.updateNextButtonState();
    }

    renderStep2(state) {
        this.clear();
        document.querySelector("#next").disabled = false;
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Loan details";

        // income label
        const incomeLabel = document.createElement("label");
        incomeLabel.htmlFor = "income";
        incomeLabel.textContent = "Income";

        // income
        const income = document.createElement("select");
        income.id = "income";
        income.className = "form-control";

        ["<1000€", "1000–2000€", ">2000€"].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val;

            if (state?.income === val) option.selected = true;

            income.appendChild(option);
        });

        // loan amount error
        const loanError = document.createElement("div");
        loanError.id = "loan-error";
        loanError.className = "error-message";
        loanError.hidden = true;

        // loan amount label
        const loanLabel = document.createElement("label");
        loanLabel.htmlFor = "loanAmount";
        loanLabel.textContent = "Loan Amount";

        // loan amount
        const loan = document.createElement("input");
        loan.className = "form-control";
        loan.type = "number";
        loan.id = "loanAmount";
        loan.value = state?.loanAmount ?? "";

        // period label
        const periodLabel = document.createElement("label");
        periodLabel.htmlFor = "loanPeriod";
        periodLabel.textContent = "Loan Period";

        // period
        const period = document.createElement("select");
        period.id = "loanPeriod";
        period.className = "form-control";


        [12, 24, 36].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val + " months";

            if (state?.loanPeriod === val) option.selected = true;

            period.appendChild(option);
        });

        // interest label
        const rateLabel = document.createElement("label");
        rateLabel.htmlFor = "interestRate";
        rateLabel.textContent = "Interest Rate";

        // interest
        const rate = document.createElement("select");
        rate.id = "interestRate";
        rate.className = "form-control";

        [5, 10, 15].forEach(val => {
            const option = document.createElement("option");
            option.value = val;
            option.textContent = val + "%";

            if (state?.interestRate === val) option.selected = true;

            rate.appendChild(option);
        });

        // payment
        const payment = document.createElement("p");

        const text = document.createTextNode("Monthly: ");

        const span = document.createElement("span");
        span.id = "monthlyPayment";
        
        const initialPayment = calculateMonthlyPayment(
            state?.loanAmount,
            state?.interestRate,
            state?.loanPeriod
        );
        
        span.textContent = initialPayment ? initialPayment.toFixed(2) : "0.00";
        const euro = document.createTextNode(" €");

        payment.append(text, span, euro);

        this.app.append(
            title, 
            incomeLabel, 
            income, 
            loanLabel, 
            loanError,
            loan, 
            periodLabel, 
            period, 
            rateLabel, 
            rate, 
            payment
        );
    }

    renderStep3TermsPrivacy() {
        this.clear();
        document.querySelector("#nav-container").classList.remove("hidden");

        const title = document.createElement("h2");
        title.textContent = "Terms & Privacy";

        const nextBtn = document.querySelector("#next");
        if (nextBtn) nextBtn.disabled = true;

        const textBox = document.createElement("div");
        textBox.className = "terms-text";

        textBox.innerHTML = `
            <p>Welcome to OrangeBank loan service.</p>

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

        const consentsError = document.createElement("div");
        consentsError.id = "consents-error";
        consentsError.className = "error-message";
        consentsError.hidden = true;

        const checkboxLabel = document.createElement("label");
        checkboxLabel.className = "checkbox-label";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "accept-checkbox";
        checkboxLabel.append(checkbox, " I accept Terms & Privacy");

        const checkboxLabelEmail = document.createElement("label");
        checkboxLabelEmail.htmlFor = "receive-offers";

        const emailError = document.createElement("div");
        emailError.id = "email-error";
        emailError.className = "error-message";
        emailError.hidden = true;

        const emailLabel = document.createElement("label");
        emailLabel.htmlFor = "email-notifications";
        emailLabel.textContent = "Email Address";
        emailLabel.hidden = true;

        const emailField = document.createElement("input")
        emailField.type = "email";
        emailField.id = "email-notifications";
        emailField.placeholder = "Email";
        emailField.hidden = true;

        checkboxLabelEmail.className = "checkbox-label";
        const checkboxEmail = document.createElement("input");
        checkboxEmail.type = "checkbox";
        checkboxEmail.id = "receive-offers";
        checkboxLabelEmail.append(checkboxEmail, "I agree to receive offers (optional)");

        this.app.append(
            title, 
            textBox, 
            checkboxLabel, 
            consentsError, 
            checkboxLabelEmail, 
            emailError, 
            emailLabel, 
            emailField
        );
    }

    renderEmailField() {
        const checkbox = document.querySelector("#receive-offers");
        const input = document.querySelector("#email-notifications");
        const label = document.querySelector("label[for='email-notifications']");
        if (checkbox.checked) {
            input.hidden = false;
            label.hidden = false;
        } else {
            input.hidden = true;
            label.hidden = true;
            this.hideEmailError();
        }
    }

    showEmailError(message) {
        const errorDiv = this.app.querySelector("#email-error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.hidden = false;
        }
    }

    hideEmailError() {
        const errorDiv = this.app.querySelector("#email-error");
        if (errorDiv) {
            errorDiv.hidden = true;
            errorDiv.textContent = "";
        }
    }

    showConsentsError(message) {
        const errorDiv = this.app.querySelector("#consents-error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.hidden = false;
        }
    }

    hideConsentsError() {
        const errorDiv = this.app.querySelector("#consents-error");
        if (errorDiv) {
            errorDiv.hidden = true;
            errorDiv.textContent = "";
        }
    }

    showAdditionalInfoError(message) {
        const errorDiv = this.app.querySelector("#additional-info-error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.hidden = false;
        }
    }

    hideAdditionalInfoError() {
        const errorDiv = this.app.querySelector("#additional-info-error");
        if (errorDiv) {
            errorDiv.hidden = true;
            errorDiv.textContent = "";
        }
    }

    showLoanError(message) {
        const errorDiv = this.app.querySelector("#loan-error");
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.hidden = false;
        }
    }

    hideLoanError() {
        const errorDiv = this.app.querySelector("#loan-error");
        if (errorDiv) {
            errorDiv.hidden = true;
            errorDiv.textContent = "";
        }
    }

    updateNextButtonState() {
        const nextBtn = document.querySelector("#next");
        if (!nextBtn) return;

        const employment = document.querySelector("input[name='employment']:checked");
        nextBtn.disabled = !employment;
    }


    allowAccept(back = false) {
        const checkbox = document.querySelector("#accept-checkbox");
        const nextBtn = document.querySelector("#next");
        if (back) {
            nextBtn.disabled = false;
            return;
        }
        nextBtn.disabled = !checkbox.checked;
    }


    renderStep4AdditionalInfo() {
        this.clear();
        document.querySelector("#nav-container").classList.remove("hidden");
        document.querySelector("#next").disabled = false;
        const title = document.createElement("h2");
        title.textContent = "Additional info";

        const additionalInfoError = document.createElement("div");
        additionalInfoError.id = "additional-info-error";
        additionalInfoError.className = "error-message";
        additionalInfoError.hidden = true;

        const textareaLabel = document.createElement("label");
        textareaLabel.htmlFor = "additionalInfo";
        textareaLabel.textContent = "Additional Information (minimum 10 characters)";

        const textarea = document.createElement("textarea");
        textarea.id = "additionalInfo";
        textarea.className = "form-control";
        textarea.placeholder = "Anything else you want to add?";

        this.app.append(title, textareaLabel, additionalInfoError, textarea);
    }

    renderSummary(state, payment) {
        this.clear();
        document.querySelector("#nav-container").classList.add("hidden");

        const title = document.createElement("h2");
        title.textContent = "Summary";

        const data = [
            `Employment: ${state.employmentStatus}`,
            `Income: ${state.income}`,
            `Loan: ${state.loanAmount}`,
            `Period: ${state.loanPeriod}`,
            `Rate: ${state.interestRate}`,
            `Monthly: ${payment.toFixed(2)} €`
        ];

        const list = document.createElement("div");

        data.forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            list.appendChild(p);
        });

        const btnGroup = document.createElement("div");
        btnGroup.className = "navigation";

        const submitBtn = document.createElement("button");
        submitBtn.className = "btn";
        submitBtn.id = "submit";
        submitBtn.textContent = "Submit";

        const backBtn = document.createElement("button");
        backBtn.className = "btn btn-secondary";
        backBtn.id = "back-to-intro";
        backBtn.textContent = "Back To Intro";

        btnGroup.append(submitBtn, backBtn);
        this.app.append(title, list, btnGroup);
    }

    renderConfirmation() {
        this.clear();
        document.querySelector("#nav-container").classList.add("hidden");

        const title = document.createElement("h2");
        title.textContent = "Thank you!";

        const message = document.createElement("p");
        message.textContent = "Your application has been submitted successfully.";

        const btn = document.createElement("button");
        btn.className = "btn";
        btn.id = "back-to-intro";
        btn.textContent = "Back To Intro";

        this.app.append(title, message, btn);
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

    getEmailData() {
        const emailInput = document.querySelector("#email-notifications");
        return emailInput?.value || null;
    }


    
    updatePayment(value) {
        const el = document.querySelector("#monthlyPayment");
        if (el) el.textContent = value.toFixed(2);
    }

    clearError() {
        // Clear all error messages
        const errors = this.app.querySelectorAll(".error-message");
        errors.forEach(error => {
            error.hidden = true;
            error.textContent = "";
        });
    }
}