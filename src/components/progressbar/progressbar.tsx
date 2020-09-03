import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { TweenLite } from 'gsap'
import { CSSTransition } from 'react-transition-group'
const prefix = `ty__`
const theme = {
  transitionName: `${prefix}progress-wrapper`,
}
const ProgressbarStyle = styled.div<{
  timeout: number
  transitionName: string
}>`
  .${(props) => props.transitionName}.enter.enter-active {
    opacity: 1;
    filter: blur(0);
    transition: all ${(props) => props.timeout}ms;
  }

  .${(props) => props.transitionName}.exit.exit-active {
    filter: blur(50px);
    transition: all ${(props) => props.timeout}ms;
    opacity: 0;
  }

  .${(props) => props.transitionName}.enter {
    opacity: 0;
  }

  .${(props) => props.transitionName}.exit {
    opacity: 1;
  }
  .${props => props.transitionName} {
    display: block;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }
  .line {
    height: 2px;
    background-color: black;
  }
  .text {
    margin: 0 10px;
  }
`
export interface ProgressbarProps {
  max: number
  value: number
  onDone?: () => void
  duration?: number
}

export const Progressbar: React.FC<ProgressbarProps> = (props) => {
  const [tweenValue, setTweenValue] = useState(props.value || 0)

  const closureValue = useRef({ value: props.value } || 0)

  const twn = useRef<TweenLite>()

  const isEnd = props.max <= tweenValue
  console.log(isEnd)

  const progressStatus = useMemo(() => {
    return {
      width: `${((tweenValue / props.max || 0) * 50).toFixed(2)}%`,
      text: ~~((tweenValue / props.max) * 100),
    }
  }, [props.max, tweenValue])

  useEffect(() => {
    const value = props.max > props.value ? props.value : props.max
    twn.current = TweenLite.to(closureValue.current, props.duration || 2, {
      value: value,
      roundProps: 'value',
      onUpdate() {
        setTweenValue(closureValue.current.value)
      },
    })
  }, [props.duration, props.max, props.value])

  useEffect(() => {
    twn.current?.duration(props.duration || 0.5)
  }, [props.duration])

  return (
    <ProgressbarStyle timeout={1500} transitionName={theme.transitionName}>
      <CSSTransition
        in={!isEnd}
        className={theme.transitionName}
        onExit={() => {
          if (isEnd) {
            props.onDone?.()
          }
        }}
        addEndListener={() => {}}
        unmountOnExit
        timeout={1500}
      >
        <div className={theme.transitionName}>
          <span className="line" style={{ width: progressStatus.width }}></span>
          <span className="text">{`${progressStatus.text}%`}</span>
          <span className="line" style={{ width: progressStatus.width }}></span>
        </div>
      </CSSTransition>
    </ProgressbarStyle>
  )
}
