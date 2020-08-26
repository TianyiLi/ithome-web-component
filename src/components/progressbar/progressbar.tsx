import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { TweenLite } from 'gsap'
const ProgressbarStyle = styled.div``
export interface ProgressbarProps {
  max: number
  start?: number
  onDone?: () => void
}
export interface ProgressbarRef {
  setTo: (value: number) => void
}
export const Progressbar = React.forwardRef<ProgressbarRef, ProgressbarProps>(
  (props, ref) => {
    const [progress, setProgress] = useState(props.start || 0)
    const [tweenValue, setTweenValue] = useState(props.start || 0)
    const progressStatus = useMemo(() => {
      return {
        width: `calc(${(progress / 100) * 50}vw - 50%)`,
        text: progress.toFixed(0),
      }
    }, [tweenValue])

    useEffect(() => {
      TweenLite.to(document.createElement('div'), 1, {
        onUpdate: console.log
      })
    }, [progress])

    useEffect(() => {
      const _ref = ref as React.MutableRefObject<ProgressbarRef>
      if (_ref) _ref.current.setTo = setProgress
    }, [ref])

    return <ProgressbarStyle></ProgressbarStyle>
  }
)
