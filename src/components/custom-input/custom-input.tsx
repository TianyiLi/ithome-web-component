import React, { InputHTMLAttributes, useEffect } from 'react';
import styled from 'styled-components';

export interface InputProps
  extends Omit<InputHTMLAttributes<string>, 'onChange' | 'prefix'> {
  onChange?: (str: string) => void;
  suffix?: React.ReactNode;
  spec?: string;
  labelPlaceholder?: boolean;
}

/**
 *
 * @param spec _ as empty place
 * @param input
 */
function format(spec = '', input = '', isDelete = false) {
  // getAvailable length;
  if (isDelete) return input;
  const fillinInput = input.replace(/[^\d]/g, '').split('');
  const finalString = spec.replace(/(_)/g, () => fillinInput.shift() || '');
  if (/_/.test(finalString[input.length])) {
    return finalString.substr(0, Math.min(spec.length, input.length));
  }
  return finalString.substr(0, spec.length);
}

const InputStyle = styled.span<{
  hasSuffix: boolean;
  hasPlaceholder: boolean;
}>`
  position: relative;
  padding: 0.5em 0.8em;
  outline: black;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  .place-holder {
    display: ${(props) => (props.hasPlaceholder ? 'inline-block' : 'none')};
  }
  .suffix {
    display: ${(props) => (props.hasSuffix ? 'inline-block' : 'none')};
  }
  .input-wrapper {
    position: relative;
    height: 1.5em;
  }
  input {
    outline: unset;
    font-size: 1em;
  }
  .place-holder {
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    left: 0.5rem;
    opacity: 0.3;
    transition: all 0.3s;
  }
  input:focus ~ .place-holder {
    top: -1.2em;
    left: 0;
    font-size: 0.8em;
    opacity: 1;
  }
`;

export const CustomInput: React.FC<InputProps> = ({
  value,
  type,
  suffix,
  spec,
  placeholder,
  labelPlaceholder,
  ...props
}) => {
  const [inputValue, setValue] = React.useState(value || '');
  function onValueChange(e: React.FormEvent<HTMLInputElement>) {
    let _value = e.currentTarget.value;
    if (spec) {
      const isDelete =
        (e.nativeEvent as any).inputType === 'deleteContentBackward';
      _value = format(spec, _value, isDelete);
    }
    setValue(_value);
    props?.onChange?.(_value);
  }
  useEffect(() => {
    setValue(value as string);
  }, [value]);
  return (
    <InputStyle hasPlaceholder={!!placeholder} hasSuffix={!!suffix}>
      <div className="input-wrapper">
        <input
          type={type || 'text'}
          value={inputValue}
          onChange={onValueChange}
          placeholder={(!labelPlaceholder && placeholder) || ''}
        />
        {labelPlaceholder && (
          <span className="place-holder">{placeholder}</span>
        )}
      </div>
      <span className="suffix">{suffix}</span>
    </InputStyle>
  );
};
