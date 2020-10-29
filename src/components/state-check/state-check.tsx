import React from 'react'
import styled from 'styled-components'

export interface IStateCheckProps {
  state: 'check' | 'error' | 'pending'
  message: string
}

interface IStateCheckStyleProps {
  state: 'pending' | 'resolve'
}

const color = {
  check: '#73AF55',
  error: '#D06079',
  pending: '#73AF55',
}

const StateCheckStyle = styled.div<IStateCheckStyleProps>`
  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes dash-prepare {
    from {
      transform: rotate(0deg);
      stroke-dashoffset: ${121 * 3.14159};
    }
    to {
      transform: rotate(360deg);
      stroke-dashoffset: ${-121 * 3.14159};
    }
  }
  @keyframes dash-check {
    from {
      stroke-dashoffset: -100;
    }
    to {
      stroke-dashoffset: 900;
    }
  }
  svg {
    width: 100px;
    display: block;
    margin: 40px auto 0;
  }
  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      transform-origin: center;
      ${({ state }) =>
        state === 'pending'
          ? `
      animation: dash-prepare 3s ease-in-out infinite;
      stroke-dasharray: ${122 * 3.14159};
          `
          : `
      animation: dash .9s ease-in-out;
      `}
    }
    &.line {
      stroke-dashoffset: 1000;
      ${({ state }) =>
        state === 'pending'
          ? ''
          : `
      animation: dash 0.9s 0.35s ease-in-out forwards;
      `}
    }
    &.check {
      stroke-dashoffset: -100;
      ${({ state }) =>
        state === 'pending'
          ? ''
          : `animation: dash-check 0.9s 0.35s ease-in-out forwards;`}
    }
  }
  .hinting-text {
    text-align: center;
    margin: 20px 0 60px;
    font-size: 1.25em;
  }
`

export const StateCheck: React.FC<IStateCheckProps> = (props) => {
  const childComponent = React.useMemo(() => {
    switch (props.state) {
      case 'pending':
        return <></>
      case 'check':
        return (
          <polyline
            className="path check"
            fill="none"
            stroke={color[props.state]}
            strokeWidth="6"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        )
      case 'error':
        return (
          <>
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              strokeWidth="6"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </>
        )
    }
  }, [props.state])
  return (
    <StateCheckStyle state={props.state === 'pending' ? 'pending' : 'resolve'}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          className="path circle"
          fill="none"
          stroke={color[props.state]}
          stroke-width="6"
          stroke-miterlimit="10"
          cx="65.1"
          cy="65.1"
          r="61"
        />
        {childComponent}
      </svg>
      <div className="hinting-text" style={{ color: color[props.state] }}>
        {props.message}
      </div>
    </StateCheckStyle>
  )
}
