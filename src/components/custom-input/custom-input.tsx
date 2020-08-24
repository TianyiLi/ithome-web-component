import React, { InputHTMLAttributes, useEffect } from 'react'
import styled from 'styled-components'

export interface InputProps
  extends Omit<InputHTMLAttributes<string>, 'onChange' | 'prefix'> {
  onChange?: (str: string) => void
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  spec?: string
}

/**
 *
 * @param spec _ as empty place
 * @param input
 */
function format(spec = '', input = '', isDelete = false) {
  // getAvailable length;
  if (isDelete) return input
  const fillinInput = input.replace(/[^\d]/g, '').split('')
  const finalString = spec.replace(/(_)/g, () => fillinInput.shift() || '')
  if (/_/.test(finalString[input.length])) {
    return finalString.substr(0, Math.min(spec.length, input.length))
  }
  return finalString.substr(0, spec.length)
}

const InputStyle = styled.span<{
  hasSuffix: boolean
  hasPrefix: boolean
  hasPlaceholder: boolean
}>`
  position: relative;
  .place-holder {
    display: ${props => props.hasSuffix ? 'inline-block' : 'none'}
  }
`

export const CustomInput: React.FC<InputProps> = ({
  value,
  type,
  prefix,
  suffix,
  spec,
  placeholder,
  ...props
}) => {
  const [inputValue, setValue] = React.useState(value || '')
  function onValueChange(e: React.FormEvent<HTMLInputElement>) {
    let _value = e.currentTarget.value
    if (spec) {
      const isDelete =
        (e.nativeEvent as any).inputType === 'deleteContentBackward'
      _value = format(spec, _value, isDelete)
    }
    setValue(_value)
    props?.onChange?.(_value)
  }
  useEffect(() => {
    setValue(value as string)
  }, [value])
  return (
    <InputStyle hasPlaceholder={!!placeholder} hasPrefix={!!prefix} hasSuffix={!!suffix}>
      <input
        type={type || 'text'}
        value={inputValue}
        onChange={onValueChange}
      />
      <span className="place-holder">{placeholder}</span>
      <span className="prefix">{prefix}</span>
      <span className="suffix">{suffix}</span>
    </InputStyle>
  )
}
