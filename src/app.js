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

// 🔹 старт → step1 + overlay
function startFlow() {
    step = 1;

    view.renderStep1(state);

    
}

// 🔹 next
function next() {
    try {
        // 🔥 если открыт overlay (terms)
        const overlay = document.querySelector("#terms-privacy");

        if (overlay) {
            const { consents } = view.getStep3Data();

            if (!consents.length) {
                throw new Error("Accept at least one consent!");
            }

            view.removeOverlay();
            return; // остаёмся на step1
        }

        collectData();

        // step1 → step2
        if (step === 1) {
            step = 2;
            view.renderStep2(state);
            
            return;
        }

        // step2 → step4 (textarea)
        if (step === 2) {
            
            step = 3;
            view.renderStep3();
            view.renderTermsPrivacy();
            return;
        }

        // step3 → summary
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

// 🔹 back
function back() {
    const overlay = document.querySelector("#terms-privacy");

    // если overlay открыт → просто закрываем
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

// 🔹 сбор данных
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

// 🔹 live калькулятор
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