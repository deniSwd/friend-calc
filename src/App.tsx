import { FC } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { CustomInput } from './components/macro/customInput/CustomInput'
import { ResultBox } from './components/micro/resultBox/ResultBox'
import { Button } from './components/micro/button/Button'

export const App: FC = () => {

  return (
    <div className={s.appWrap}>
      <div className={s.app}>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className={s.inputsBox}>
          <CustomInput title={'Стоимость автомобиля'}
                       placeholderValue={'₽'}
                       minParameter={1500000}
                       maxParameter={10000000} />
          <CustomInput title={'Первоначальный взнос'}
                       placeholderValue={'₽'}
                       percent={13}
                       minParameter={150000}
                       maxParameter={6000000} />
          <CustomInput title={'Срок лизинга'}
                       placeholderValue={'мес.'}
                       minParameter={6}
                       maxParameter={120} />
        </div>
        <div className={s.resultsBox}>
          <ResultBox title={'Сумма договора лизинга'}
                     result={4589923}/>
          <ResultBox title={'Ежемесячный платеж от'}
                     result={114455}/>
          <Button buttonName={'Оставить заявку'} />
        </div>
      </div>
    </div>
  )
}

