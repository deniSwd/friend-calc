//вычисляем минимальное значение первоначального взноса
export const minInitialPay = (carPrice: number): number => Math.round(carPrice * 0.1)
//вычисляем максимальное значение первоначального взноса
export const maxInitialPay = (carPrice: number): number => Math.round(carPrice * 0.6)
//вычисляем максимальное значение первоначального взноса
export const percentCalc = (carPrice: number, initialPay: number): number => Math.round(initialPay * 100 / carPrice)
//вычисляем величину ежемесячного платежа
export const monthlyPay =
  (carPrice: number, initialPay: number, creditPeriod: number): number => {
    return Math.round((carPrice - initialPay) * (0.05 * Math.pow((1 + 0.05), creditPeriod) / (Math.pow((1 + 0.05), creditPeriod) - 1)))
  }
//вычисляем стоимость договора лизинга
export const contractAmount =
  (initialPay: number, creditPeriod: number, monthlyPay: number): number => {
    return initialPay + creditPeriod * monthlyPay
  }


