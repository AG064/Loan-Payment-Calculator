import { State } from "./state.js";
import { View } from "./view.js";
import { calculateMonthlyPayment } from "./calculator.js";

const state = new State();
const view = new View();

let step = 0;

init();

function init() {
    view.renderIntro();

    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
}

// events
function handleClick(e) {
    view.clearError(); // so that error is cleared when user tries to interact again, not only when going back or forward
    if (e.target.id === "start") startFlow();
    if (e.target.id === "next") next();
    if (e.target.id === "back") back();
    if (e.target.id === "accept-checkbox") {
        view.allowAccept();
    }
    if (e.target.id === "receive-offers") {
        view.renderEmailField();
    }
    if (e.target.id === "back") {
        view.allowAccept(true);
    }
    if (e.target.id === "back-to-intro") {
        step = 0;
        view.renderIntro();
    }
    if (e.target.name === "employment") {
        view.updateNextButtonState();
    }
}

// start -> step1 -> overlay
function startFlow() {
    step = 1;

    view.renderStep1(state);
}

// next button
function next() {
    view.clearError();
    try {
        

        // step1 → step2 (loan details)
        if (step === 1) {
            collectData();
            step = 2;
            view.renderStep2(state);
            return;
        }

        // step2 (loan) → step3 (terms)
        if (step === 2) {
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
            step = 3;
            view.renderStep3TermsPrivacy();
            return;
        }

        // step3 (terms) → step4 (textarea)
        if (step === 3) {
            const { consents } = view.getStep3Data();
            if (!consents.length) {
                view.showConsentsError("Accept at least one consent!");
                throw new Error("Accept at least one consent!");
            }

            view.hideConsentsError();

            // Check email if checkbox is checked
            const emailCheckbox = document.querySelector("#receive-offers");
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

            step = 4;
            view.renderStep4AdditionalInfo();
            return;
        }

        // step4 (textarea) -> summary
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

// back button
function back() {
    view.clearError();

    if (step === 0 || step === 1) return;

    try {
        collectData();
    } catch (e) {
        console.debug("Draft data validation failed on back navigation. Ignoring:", e.message); // we can ignore validation errors on back navigation, because user might want to go back and fix something
    }
    if (step === 4) {
        step = 3;
        view.renderStep3TermsPrivacy();
        return;
    }

    if (step === 3) {
        step = 2;
        view.renderStep2(state);
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

// data collection from steps
function collectData() {
    if (step === 1) {
        const { employmentStatus } = view.getStep1Data();
        state.employmentStatus = employmentStatus;
    }

    if (step === 2) {
        const data = view.getStep2Data();

        state.income = data.income;
        state.loanAmount = data.loanAmount;
        state.loanPeriod = data.loanPeriod;
        state.interestRate = data.interestRate;
    }
}

// live calculator
function handleInput() {
    if (step !== 2) return;
    if (step !== 2) return;

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

// summary
function renderSummary() {
    const payment = calculateMonthlyPayment(
        state.loanAmount,
        state.interestRate,
        state.loanPeriod
    );

    view.renderSummary(state, payment);
}