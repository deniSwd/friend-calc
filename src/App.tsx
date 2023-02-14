import { FC, useEffect, useRef, useState, FocusEvent, KeyboardEvent } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { InputNumber } from './components/micro/InputNumber'

export const App: FC = () => {
  const [currentValue, setCurrentValue] = useState('1500000')
  const [numberValue, setNumberValue] = useState(1500000)
  const inputValue = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    if (inputValue.current === null) return
    let withMaskValue = (+inputValue.current.value
      .replace(/\D/g, '')).toLocaleString('en-US').replaceAll(',', ' ')
    setNumberValue(+withMaskValue.replaceAll(' ', ''))
    setCurrentValue(withMaskValue)
  }
  const range = (targetValue: string) => {
    const eventNumberValue = +targetValue.replaceAll(' ', '')
    if (eventNumberValue < 1500000) {
      setCurrentValue('1 500 000')
    } else if (eventNumberValue > 10000000) {
      setCurrentValue('10 000 000')
    } else {
      setCurrentValue(targetValue)
    }
  }
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    range(e.target.value)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      range(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  useEffect(() => {
    handleChange()
  }, [currentValue])

  return (
    <div className={s.appWrap}>
      <div className={s.app}>
        <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
        <p>стоимость автомобиля</p>
        <InputNumber placeholderValue={'₽'}
                     percentValue={13}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     onKeyDown={handleKeyDown}
                     ref={inputValue}
                     value={currentValue} />
      </div>
    </div>
  )
}

