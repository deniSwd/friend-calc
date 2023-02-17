import { ChangeEvent, FC, FocusEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import s from './customInput.module.scss'
import { InputNumber } from '../../micro/inputNumber/InputNumber'
import { InputRange } from '../../micro/inputRange/InputRange'
import { withMask } from '../../../utils/valueWithMask'

interface CustomInputProps {
  placeholderValue: string
  minParameter: number
  maxParameter: number
  title: string
  percent?: number
  numberValue: number
  setNumberValue: (numberValue: number) => void
}

export const CustomInput: FC<CustomInputProps> = ({
                                                    numberValue,
                                                    setNumberValue,
                                                    placeholderValue,
                                                    minParameter,
                                                    maxParameter,
                                                    title,
                                                    percent
                                                  }) => {
  const [displayingValue, setDisplayingValue] = useState(withMask(numberValue))
  //Реф инпута
  const inputValue = useRef<HTMLInputElement>(null)
  //Реф ползунка
  const progressRef = useRef<HTMLInputElement>(null)
  //Рассчитываем значение ширины для полосы прогресса ползунка
  const calcProgress =
    (minValue: number, maxValue: number, numberValue: number) => {
      const progress = 100 / ((maxValue - minValue) / (numberValue - minValue))
      if (progressRef.current === null) return
      progressRef.current.style.width = `${progress}%`
    }
  //Обрабатываем значение из инпута с использованием маски
  const handleChange = () => {
    if (inputValue.current === null) return
    setDisplayingValue(withMask(Number(inputValue.current.value.replace(/\D/g, ''))))
  }
  //Устанавливаем значение в допустимом диапазоне
  const range = useCallback((targetValue: string) => {
    const eventNumberValue = +targetValue.replaceAll(' ', '')
    if (eventNumberValue < minParameter) {
      setDisplayingValue(withMask(minParameter))
      setNumberValue(minParameter)
    } else if (eventNumberValue > maxParameter) {
      setDisplayingValue(withMask(maxParameter))
      setNumberValue(maxParameter)
    } else {
      setDisplayingValue(withMask(eventNumberValue))
      setNumberValue(eventNumberValue)
    }
  }, [minParameter, maxParameter])
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
    range(withMask(numberValue))
    calcProgress(minParameter, maxParameter, numberValue)
  }, [minParameter, maxParameter, numberValue])

  return (
    <div className={s.customInputWrap}>
      <div className={s.title}>{title}</div>
      <div className={s.customInput}>
        <div className={s.numberWrap}>
          <InputNumber placeholderValue={placeholderValue}
                       percentValue={percent}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       onKeyDown={handleKeyDown}
                       ref={inputValue}
                       value={displayingValue} />
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