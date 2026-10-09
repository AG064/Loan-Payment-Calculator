import test from "node:test";
import assert from "node:assert/strict";
import { calculateMonthlyPayment } from "../src/calculator.js";
import { State } from "../src/state.js";

test("zero interest spreads principal across the selected period", () => {
    const state = new State();
    state.loanAmount = 1200;
    state.interestRate = 0;
    state.loanPeriod = 12;
    assert.equal(calculateMonthlyPayment(state.loanAmount, state.interestRate, state.loanPeriod), 100);
});

test("positive and very small interest retain a finite amortized payment", () => {
    assert.ok(Math.abs(calculateMonthlyPayment(10000, 5, 36) - 299.7089710466555) < 1e-8);
    assert.ok(Math.abs(calculateMonthlyPayment(1200, 1e-12, 12) - 100) < 1e-8);
    assert.equal(calculateMonthlyPayment(null, 0, 12), 0);
});

test("invalid numeric inputs cannot produce a misleading payment", () => {
    for (const values of [[Infinity, 5, 12], [1200, NaN, 12], [1200, -1, 12], [1200, 0, 0]]) {
        assert.throws(() => calculateMonthlyPayment(...values), RangeError);
    }
    const state = new State();
    assert.throws(() => { state.loanAmount = Infinity; });
    assert.throws(() => { state.interestRate = Infinity; });
});
