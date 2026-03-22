export class State {
    _employmentStatus = null;
    _income = null;
    _loanAmount = null;
    _loanPeriod = null;
    _interestRate = null;

    // employmentStatus
    get employmentStatus() {
        return this._employmentStatus;
    }

    set employmentStatus(value) {
        const allowed = ["employed", "self-employed", "unemployed"];

        if (
            value == null ||
            typeof value !== "string" ||
            !allowed.includes(value)
        ) {
            throw new Error("Invalid employment status!");
        }

        this._employmentStatus = value;
    }

    // income
    get income() {
        return this._income;
    }

    set income(value) {
        const allowed = ["<1000€", "1000–2000€", ">2000€"]

        if (!allowed.includes(value)) {
            throw new Error("Invalid value!");
        }

        this._income = value;
    }

    // loanAmount
    get loanAmount() {
        return this._loanAmount;
    }

    set loanAmount(value) {
        const num = Number(value);

        if (value == null || Number.isNaN(num) || num <= 0) {
            throw new Error("Loan amount must be a positive number!");
        }

        this._loanAmount = num;
    }

    // loanPeriod
    get loanPeriod() {
        return this._loanPeriod;
    }

    set loanPeriod(value) {
        const num = Number(value);
        const allowedMonths = [12, 24, 36];

        if (value == null || Number.isNaN(num) || num <= 0) {
            throw new Error("Loan period must be a positive number!");
        }

        if (!allowedMonths.includes(num)) {
            throw new Error("Not allowed loan period!");
        }

        this._loanPeriod = num;
    }

    // interestRate
    get interestRate() {
        return this._interestRate;
    }

    set interestRate(value) {
        const num = Number(value);

        if (Number.isNaN(num)) {
            throw new Error("Interest rate must be a number!");
        }

        if (num < 0 || num > 100) {
            throw new Error("Interest rate must be between 0 and 100!");
        }

        this._interestRate = Math.round(num * 100) / 100;
    }
}
