import { FC, useEffect, useRef, useState, FocusEvent, KeyboardEvent, ChangeEvent, useCallback } from 'react'
import s from './app.module.scss'
import './app.module.scss'
import { InputNumber } from './components/micro/inputNumber/InputNumber'
import { InputRange } from './components/micro/inputRange/InputRange'

const minPrice = 1500000
const maxPrice = 10000000

export const App: FC = () => {
  const [currentValue, setCurrentValue] = useState('1500000')
  const [numberValue, setNumberValue] = useState(minPrice)
  const inputValue = useRef<HTMLInputElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)

  const calcProgress =
    useCallback((minValue: number, maxValue: number, numberValue: number) => {
      const progress = 100 / ((maxValue - minValue) / (numberValue - minValue))
      if (progressRef.current === null) return
      progressRef.current.style.width = `${progress}%`
    }, [])

  const handleChange = () => {
    if (inputValue.current === null) return
    const withMaskValue = (+inputValue.current.value
      .replace(/\D/g, '')).toLocaleString('en-US').replaceAll(',', ' ')
    setCurrentValue(withMaskValue)
  }
  const range = (targetValue: string) => {
    const eventNumberValue = +targetValue.replaceAll(' ', '')
    if (eventNumberValue < minPrice) {
      setNumberValue(minPrice)
      setCurrentValue('1 500 000')
    } else if (eventNumberValue > maxPrice) {
      setNumberValue(maxPrice)
      setCurrentValue('10 000 000')
    } else {
      setNumberValue(+targetValue.replaceAll(' ', ''))
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
  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    range(e.target.value)
  }

  useEffect(() => {
    handleChange()
    calcProgress(minPrice, maxPrice, numberValue)
  }, [currentValue, numberValue])
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
        <InputRange min={minPrice}
                    max={maxPrice}
                    step={1}
                    onChange={handleChangeRange}
                    value={numberValue}
                    ref={progressRef} />
      </div>
    </div>
  )
}

