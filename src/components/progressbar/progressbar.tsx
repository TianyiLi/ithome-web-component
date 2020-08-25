import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TweenLite } from 'gsap';
const ProgressbarStyle = styled.div``;
export interface ProgressbarProps {
  max: number;
  start?: number;
  onDone?: () => void;
}
export interface ProgressbarRef {
  setTo: (value: number) => void;
}
export const Progressbar = React.forwardRef<ProgressbarRef, ProgressbarProps>(
  (props, ref) => {
    const [progress, setProgress] = useState(props.start || 0);

    useEffect(() => {
      const _ref = ref as React.MutableRefObject<ProgressbarRef>;
      if (_ref.current)
        _ref.current.setTo = setProgress;
    }, [ref]);

    return <ProgressbarStyle></ProgressbarStyle>;
  }
);
