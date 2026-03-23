import { State } from "./state.js";
import { View } from "./view.js";

const state = new State();
const view = new View();

let step = 0;

init();

function init() {
    view.renderIntro();

    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
}

// 🔹 events
function handleClick(e) {
    if (e.target.id === "start") startFlow();
    if (e.target.id === "next") next();
    if (e.target.id === "back") back();
    if (e.target.id === "accept-checkbox") {
        view.allowAccept();
    }
    if (e.target.id === "back") {
        view.allowAccept(true)
    }
    if (e.target.id === "back-to-intro") {
        view.renderIntro();
    }
    if (e.target.id === "recive-offers") {
        view.renderEmailField(state);
    }
    if (e.target.name === "employment") {
        view.updateNextButtonState();
    }
}

// 🔹 старт → step1
function startFlow() {
    step = 1;

    view.renderStep1(state);
}

// 🔹 next
function next() {
    try {
        

        // step1 → step2 (terms)
        if (step === 1) {
            collectData();
            step = 2;
            view.renderTermsPrivacy();
            return;
        }

        // step2 (terms) → step3 (loan details)
        if (step === 2) {
            const { consents } = view.getStep3Data();

            if (!consents.length) {
                view.showConsentsError("Accept at least one consent!");
                throw new Error("Accept at least one consent!");
            }

            view.hideConsentsError();

            // Check email if checkbox is checked
            const emailCheckbox = document.querySelector("#recive-offers");
            if (emailCheckbox.checked) {
                const email = view.getEmailData();
                
                if (!email || email.trim() === "") {
                    view.showEmailError("Email is required when you agree to receive offers!");
                    throw new Error("Email is required when you agree to receive offers!");
                }

                try {
                    // Validate email format by setting to state
                    state.userEmail = email;
                    view.hideEmailError();
                } catch (e) {
                    view.showEmailError(e.message);
                    throw e;
                }
            } else {
                view.hideEmailError();
            }

            step = 3;
            view.renderStep2(state);
            return;
        }

        // step3 (loan) → step4 (textarea)
        if (step === 3) {
            const data = view.getStep2Data();

            // 1. Check for empty fields first
            // if (!data.loanAmount || !data.interestRate || !data.loanPeriod) {
            //     view.showLoanError("Loan amount required!");
            //     throw new Error("All loan fields are required!");
            // }

            // 2. Try updating the state, and catch any validation errors (like negative numbers)
            try {
                collectData();
            } catch (e) {
                view.showLoanError(e.message);
                throw e; // Stop execution so it doesn't move to the next step
            }

            view.hideLoanError();
            step = 4;
            view.renderStep3();
            return;
        }

        // step4 (textarea) → summary
        if (step === 4) {
            const { additionalInfo } = view.getStep4Data();

            if (!additionalInfo || additionalInfo.trim().length < 10) {
                view.showAdditionalInfoError("Minimum 10 characters required!");
                throw new Error("Minimum 10 characters required!");
            }

            view.hideAdditionalInfoError();
            step = 5;
            renderSummary();
            return;
        }

    } catch (e) {
        // Error is handled by specific error display methods above
    }
}

// 🔹 back
function back() {
    if (step === 0) return;

    if (step === 4) {
        step = 3;
        view.renderStep2(state);
        return;
    }

    if (step === 3) {
        step = 2;
        view.renderTermsPrivacy();
        return;
    }

    if (step === 2) {
        step = 1;
        view.renderStep1(state);
        return;
    }

    if (step === 1) {
        step = 0;
        view.renderIntro();
    }
}

// 🔹 сбор данных
function collectData() {
    if (step === 1) {
        const { employmentStatus } = view.getStep1Data();
        state.employmentStatus = employmentStatus;
    }

    if (step === 3) {
        const data = view.getStep2Data();

        state.income = data.income;
        state.loanAmount = data.loanAmount;
        state.loanPeriod = data.loanPeriod;
        state.interestRate = data.interestRate;
    }
}

// 🔹 live калькулятор
function handleInput() {
    if (step !== 3) return;

    try {
        const data = view.getStep2Data();

        if (!data.loanAmount || !data.interestRate || !data.loanPeriod) return;

        const payment = calculateMonthlyPayment(
            Number(data.loanAmount),
            Number(data.interestRate),
            Number(data.loanPeriod)
        );

        view.updatePayment(payment);
    } catch {}
}

// 🔹 summary
function renderSummary() {
    const payment = calculateMonthlyPayment(
        state.loanAmount,
        state.interestRate,
        state.loanPeriod
    );

    view.renderSummary(state, payment);
}

// 🔹 калькулятор
function calculateMonthlyPayment(amount, rate, months) {
    const monthlyRate = rate / 100 / 12;

    return (
        amount *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
}