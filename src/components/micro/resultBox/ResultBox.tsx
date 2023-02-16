import { FC } from 'react'
import s from './resultBox.module.scss'

interface ResultBoxProps {
  title: string
  result: number
}

export const ResultBox:FC<ResultBoxProps> = ({title,result})=>{
  const resultWithMask = result.toLocaleString('en-US').replaceAll(',', ' ')

  return (
    <div className={s.resultBox}>
      <div className={s.title}>{title}</div>
      <div className={s.result}>
        <div>{resultWithMask} </div>
        <div className={s.rub}>₽</div>
      </div>
    </div>
  )
}