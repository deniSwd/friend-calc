import { ComponentProps, FC } from 'react'
import s from './button.module.scss'

interface ButtonProps extends ComponentProps<'button'>{
  buttonName:string
}

export const Button: FC<ButtonProps> = ({buttonName}) => {
  return (
    <button className={s.button}>
      {buttonName}
    </button>
  )
}