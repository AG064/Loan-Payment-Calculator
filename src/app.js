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
    if (e.target.id === "back-to-intro") {
        step = 0;
        view.renderIntro();
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
        collectData();

        // step1 -> step2 (loan details)
        if (step === 1) {
            step = 2;
            view.renderStep2(state);
            return;
        }

        // step2 (loan details ) -> step3 (calculator)
        if (step === 2) {
            step = 3;
            view.renderStep3(state);
            return;
        }

        // step3 (consents) -> step4 (textarea)
        if (step === 3) {
            const { consents } = view.getStep3Data();
            if (!consents.length) {
                throw new Error("Accept at least one consent!");
            }
            step = 4;
            view.renderStep4();
            return;
        }

        // step4 (textarea) -> summary
        if (step === 4) {
            const { additionalInfo } = view.getStep4Data();

            if (!additionalInfo || additionalInfo.trim().length < 10) {
                throw new Error("Minimum 10 characters required!");
            }
            step = 5;
            renderSummary();
            return;
        }

    } catch (e) {
        view.showError(e.message);
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
        view.renderStep3(state);
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