import { ChangeEvent, FC, FocusEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import s from './customInput.module.scss'
import { InputNumber } from '../../micro/inputNumber/InputNumber'
import { InputRange } from '../../micro/inputRange/InputRange'

interface CustomInputProps {
  minParameter: number
  maxParameter: number
  title: string
  percent?: number
}

export const CustomInput: FC<CustomInputProps> = ({
                                                    minParameter,
                                                    maxParameter,
                                                    title,
                                                    percent
                                                  }) => {
  //Текущее значение типа string с маской
  const [currentValue, setCurrentValue] = useState('1 500 000')
  //Текущее значение типа number
  const [numberValue, setNumberValue] = useState(minParameter)
  //Реф инпута
  const inputValue = useRef<HTMLInputElement>(null)
  //Реф ползунка
  const progressRef = useRef<HTMLInputElement>(null)
  //Рассчитываем значение ширины для полосы прогресса ползунка
  const calcProgress =
    useCallback((minValue: number, maxValue: number, numberValue: number) => {
      const progress = 100 / ((maxValue - minValue) / (numberValue - minValue))
      if (progressRef.current === null) return
      progressRef.current.style.width = `${progress}%`
    }, [])
  //Обрабатываем значение из инпута с испоьзованием маски
  const handleChange = () => {
    if (inputValue.current === null) return
    const withMaskValue = (+inputValue.current.value
      .replace(/\D/g, '')).toLocaleString('en-US').replaceAll(',', ' ')
    setCurrentValue(withMaskValue)
  }
  //Устанавливаем значение в допустимом диапазоне
  const range = (targetValue: string) => {
    const eventNumberValue = +targetValue.replaceAll(' ', '')
    if (eventNumberValue < minParameter) {
      setNumberValue(minParameter)
      setCurrentValue('1 500 000')
    } else if (eventNumberValue > maxParameter) {
      setNumberValue(maxParameter)
      setCurrentValue('10 000 000')
    } else {
      setNumberValue(+targetValue.replaceAll(' ', ''))
      setCurrentValue(targetValue)
    }
  }
  //Обрабатываем значение полученное при расфокусировке инпута
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    range(e.target.value)
  }
  //Обрабатываем значение по нажатию Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      range(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }
  //Обрабатываем значение выставленное ползунком
  const handleChangeRange = (e: ChangeEvent<HTMLInputElement>) => {
    range(e.target.value)
  }

  useEffect(() => {
    handleChange()
    calcProgress(minParameter, maxParameter, numberValue)
  }, [currentValue, numberValue])

  return (
    <div className={s.customInputWrap}>
      <div className={s.title}>{title}</div>
      <div className={s.customInput}>
        <div className={s.numberWrap}>
          <InputNumber placeholderValue={'₽'}
                       percentValue={percent}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       onKeyDown={handleKeyDown}
                       ref={inputValue}
                       value={currentValue} />
        </div>
        <div className={s.rangeWrap}>
          <InputRange min={minParameter}
                      max={maxParameter}
                      step={1}
                      onChange={handleChangeRange}
                      value={numberValue}
                      ref={progressRef} />
        </div>
      </div>
    </div>
  )
}