import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { TweenLite } from 'gsap'
const ProgressbarStyle = styled.div``
export interface ProgressbarProps {
  max: number
  value: number
  onDone?: () => void
  duration?: number
}

const obj = ({
  value: 0,
})

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const [tweenValue, setTweenValue] = useState(props.value || 0)

  const twn = useRef<TweenLite>()

  const progressStatus = useMemo(() => {
    return {
      width: `calc(${(tweenValue / 100) * 50}vw - 50%)`,
      text: tweenValue.toFixed(0),
    }
  }, [tweenValue])

  useEffect(() => {
    const value = props.max > props.value ? props.value : props.max
    twn.current = TweenLite.to(obj, props.duration || 2, {
      value: value,
      roundProps: 'value',
      onUpdate () {
        setTweenValue(obj.value)
      }
    })
  }, [props.value])

  useEffect(() => {
    twn.current?.duration(props.duration || 1)
  }, [props.duration])

  return (
    <ProgressbarStyle>
      <div className="progress-bar" style={{ width: progressStatus.width }}>
        {progressStatus.text}
      </div>
    </ProgressbarStyle>
  )
}
