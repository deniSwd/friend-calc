import { FC } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { CustomInput } from './components/macro/customInput/CustomInput'

export const App: FC = () => {

  return (
    <div className={s.appWrap}>

      <div className={s.app}>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        <CustomInput title={'Стоимость автомобиля'}
                     minParameter={1500000}
                     maxParameter={10000000} />
      </div>
    </div>
  )
}

