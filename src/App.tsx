import { FC, useMemo, useState } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { CustomInput } from './components/macro/customInput/CustomInput'
import { ResultBox } from './components/micro/resultBox/ResultBox'
import { Button } from './components/micro/button/Button'
import { contractAmount, maxInitialPay, minInitialPay, monthlyPay, percentCalc } from './utils/leasingCalculation'

export const App: FC = () => {
  const [carPriceValue, setCarPriceValue] = useState(3300000)
  const [initialPayValue, setInitialPayValue] = useState(420000)
  const [creditPeriodValue, setCreditPeriodValue] = useState(60)

  const minInitialPayValue = useMemo(() => minInitialPay(carPriceValue), [carPriceValue])
  const maxInitialPayValue = useMemo(() => maxInitialPay(carPriceValue), [carPriceValue])
  const monthlyPayResult = monthlyPay(carPriceValue, initialPayValue, creditPeriodValue)
  const contractAmountResult = contractAmount(initialPayValue, creditPeriodValue, monthlyPayResult)

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
          <Button buttonName={'Оставить заявку'} />
        </div>
      </div>
    </div>
  )
}

