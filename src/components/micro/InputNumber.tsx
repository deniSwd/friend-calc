import { ComponentProps, forwardRef } from 'react'
import s from './inputNumber.module.scss'

interface InputNumberProps extends ComponentProps<'input'> {
  placeholderValue: string
  percentValue?: number
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(({
                                                                             placeholderValue,
                                                                             percentValue,
                                                                             ...props
                                                                           }, ref) => {
  return (
    <div className={s.inputWrap}>
      <input {...props}
             type={'text'}
             className={s.input}
             ref={ref} />
      {percentValue ?
        <div className={s.percent}>
          <div>{percentValue}%</div>
          <div className={s.percentPlaceholder}>{placeholderValue}</div>
        </div> :
        <div className={s.placeholder}>{placeholderValue}</div>
      }
    </div>
  )
})
