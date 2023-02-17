export const contractAmount =
  (initialPay: number, creditPeriod: number, monthlyPay: number): number => {
    return initialPay + creditPeriod * monthlyPay
  }

export const monthlyPay =
  (carPrice: number, initialPay: number, creditPeriod: number): number => {
    return (carPrice - initialPay) * (0.05 * Math.pow((1 + 0.05), creditPeriod)) / (Math.pow((1 + 0.05), creditPeriod) - 1)
  }
