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

// events
function handleClick(e) {
    if (e.target.id === "start") startFlow();
    if (e.target.id === "next") next();
    if (e.target.id === "back") back();
    if (e.target.id === "accept-checkbox") {
        view.allowAccept();
    }
    if (e.target.id === "accept-terms") {
        view.removeOverlay();
    }

    if (e.target.id === "decline-terms") {
        view.renderIntro();
        view.removeOverlay();
    }
    if (e.target.id === "back-to-intro") {
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
    try {
        // if the overlay is open - validate consents and close it
        const overlay = document.querySelector("#terms-privacy");

        if (overlay) {
            const { consents } = view.getStep3Data();

            if (!consents.length) {
                throw new Error("Accept at least one consent!");
            }

            view.removeOverlay();
            return; // close overlay and stay on the same step
        }

        collectData();

        // step1 -> step2
        if (step === 1) {
            step = 2;
            view.renderStep2(state);
            
            return;
        }

        // step2 -> step3 (textarea)
        if (step === 2) {
            
            step = 3;
            view.renderStep3();
            view.renderTermsPrivacy();
            return;
        }

        // step3 -> summary
        if (step === 3) {
            const { additionalInfo } = view.getStep4Data();

            if (!additionalInfo || additionalInfo.trim().length < 10) {
                throw new Error("Minimum 10 characters required!");
            }

            step = 4;
            renderSummary();
            return;
        }

    } catch (e) {
        view.showError(e.message);
    }
}

// back button
function back() {
    const overlay = document.querySelector("#terms-privacy");

    // if overlay is open - close it
    if (overlay) {
        view.removeOverlay();
        return;
    }

    if (step === 0) return;

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

// calculator function
function calculateMonthlyPayment(amount, rate, months) {
    const monthlyRate = rate / 100 / 12;

    return (
        amount *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
}