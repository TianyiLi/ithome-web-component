import React, { InputHTMLAttributes, useRef, ReactElement } from 'react';
import styled from 'styled-components';

export interface InputProps {
  onChange?: (str: string) => void;
  prefix?: ReactElement;
  suffix?: ReactElement;
}

function formatValue() {}

const InputStyle = styled.span``;

export const CustomInput: React.FC<InputHTMLAttributes<string> & InputProps> = (
  {value, type, prefix, suffix, ...props}
) => {
  // const [value, setValue] = useState(props.value);
  const inputValue = useRef(value);
  inputValue.current = value;
  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const _value = e.target.value;

    props?.onChange?.(_value);
  }
  return (
    <InputStyle>
      <input
        type={type || 'text'}
        value={value}
        onChange={onValueChange}
      />
      <span className="prefix">{prefix}</span>
      <span className="suffix">{suffix}</span>
    </InputStyle>
  );
};
