export function calculateMonthlyPayment(amount, rate, months) {
    if (!amount || !rate || !months) return 0;
    
    const monthlyRate = rate / 100 / 12;
    return (
        amount *
        (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
    );
}