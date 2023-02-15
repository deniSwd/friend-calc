import { ComponentProps, FC, forwardRef } from 'react'
import s from './inputRange.module.scss'

interface InputRangeProps extends ComponentProps<'input'> {
}

export const InputRange = forwardRef<HTMLInputElement, InputRangeProps>(({ ...props }, ref) => {
  return (
    <div className={s.inputRangeWrap}>
      <input type={'range'} className={s.inputRange} {...props} />
      <div className={s.progressWrap}>
        <div className={s.rangeProgressTrack} ref={ref}></div>
      </div>
    </div>
  )
})