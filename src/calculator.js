export function calculateMonthlyPayment(amount, rate, months) {
    if (amount == null || rate == null || months == null) return 0;
    if (![amount, rate, months].every(Number.isFinite) || amount <= 0 || rate < 0 || months <= 0) {
        throw new RangeError("Amount and period must be positive finite numbers; interest cannot be negative.");
    }
    if (rate === 0) return amount / months;
    
    const monthlyRate = rate / 100 / 12;
    return amount * monthlyRate / -Math.expm1(-months * Math.log1p(monthlyRate));
}
