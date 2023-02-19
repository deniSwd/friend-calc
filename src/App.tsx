import { FC, useMemo, useState } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { CustomInput } from './components/macro/customInput/CustomInput'
import { ResultBox } from './components/micro/resultBox/ResultBox'
import { Button } from './components/micro/button/Button'
import { contractAmount, maxInitialPay, minInitialPay, monthlyPay, percentCalc } from './utils/leasingCalculation'
import { dataType } from './mainTypes'

export const App: FC = () => {
  const [carPriceValue, setCarPriceValue] = useState(3300000)
  const [initialPayValue, setInitialPayValue] = useState(420000)
  const [creditPeriodValue, setCreditPeriodValue] = useState(60)
  const [disable, setDisable] = useState(false)
  //Рассчитываем минимальное значение первоначального платежа
  const minInitialPayValue = useMemo(() => minInitialPay(carPriceValue), [carPriceValue])
  //Рассчитываем максимальное значение первоначального платежа
  const maxInitialPayValue = useMemo(() => maxInitialPay(carPriceValue), [carPriceValue])
  //Рассичываем ежемесячный платеж
  const monthlyPayResult = monthlyPay(carPriceValue, initialPayValue, creditPeriodValue)
  //Рассчитываем стоимость договора
  const contractAmountResult = contractAmount(initialPayValue, creditPeriodValue, monthlyPayResult)
  //Формируем объект с данными
  const data: dataType = {
    carPrice: carPriceValue,
    initialPay: initialPayValue,
    creditPeriod: creditPeriodValue,
    monthlyPay: monthlyPayResult,
    contractAmount: contractAmountResult
  }
  // Отправляем данные в алерт с задержкой, чтобы увидеть disable кнопки
  const sendData = () => {
    setDisable(true)
    const timeOutAlert = setTimeout(() => {
      alert(JSON.stringify(data))
      setDisable(false)
    }, 2000)
    return () => clearTimeout(timeOutAlert)
  }

  return (
    <div className={s.appWrap}>
      <div className={s.app}>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className={s.inputsBox}>
          <CustomInput title={'Стоимость автомобиля'}
                       numberValue={carPriceValue}
                       setNumberValue={setCarPriceValue}
                       placeholderValue={'₽'}
                       minParameter={1500000}
                       maxParameter={10000000} />
          <CustomInput title={'Первоначальный взнос'}
                       numberValue={initialPayValue}
                       setNumberValue={setInitialPayValue}
                       placeholderValue={'₽'}
                       percent={percentCalc(carPriceValue, initialPayValue)}
                       minParameter={minInitialPayValue}
                       maxParameter={maxInitialPayValue} />
          <CustomInput title={'Срок лизинга'}
                       numberValue={creditPeriodValue}
                       setNumberValue={setCreditPeriodValue}
                       placeholderValue={'мес.'}
                       minParameter={6}
                       maxParameter={120} />
        </div>
        <div className={s.resultsBox}>
          <ResultBox title={'Сумма договора лизинга'}
                     result={contractAmountResult} />
          <ResultBox title={'Ежемесячный платеж от'}
                     result={monthlyPayResult} />
          <Button buttonName={'Оставить заявку'}
                  disabled={disable}
                  onClick={() => sendData()} />
        </div>
      </div>
    </div>
  )
}

