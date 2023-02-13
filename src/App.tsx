import {FC} from 'react'
import s from './app.module.scss'
import './app.module.scss'

export const App: FC = () => {

  return (
    <div className={s.appWrap}>
      <div className={s.app}>
        <h1>Рассчитайте</h1>
        <p>стоимость автомобиля</p>
      </div>
    </div>
  )
}

