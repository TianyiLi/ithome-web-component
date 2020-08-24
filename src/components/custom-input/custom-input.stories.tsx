import React, { useState, useEffect, useMemo } from 'react'

import { CustomInput } from './custom-input'
import { Story } from '@storybook/react/types-6-0'

import { Info } from 'react-feather'
type StoryProps = DestructFC<typeof CustomInput> & {
  hasSuffix: boolean
  hasPrefix: boolean
}
const Template: Story<StoryProps> = (args) => {
  const { value, hasSuffix, hasPrefix, onChange, ..._args } = args
  const [inputValue, setValue] = useState(value)

  const iconProps = useMemo(() => {
    let result = {
      suffix: <Info />,
      prefix: <Info />,
    } as any
    if (!hasPrefix) delete result.prefix
    if (!hasSuffix) delete result.suffix
    return result
  }, [hasPrefix, hasSuffix])

  useEffect(() => {
    setValue(value)
  }, [value])
  return (
    <CustomInput
      {..._args}
      prefix={iconProps.prefix}
      suffix={iconProps.suffix}
      value={inputValue}
      onChange={(v: string) => {
        setValue(v)
        onChange?.(v)
      }}
    />
  )
}

export default {
  title: 'CustomInput',
  component: CustomInput,
  argTypes: {
    onChange: {
      action: 'change',
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'mobile'],
      },
    },
    value: { control: false },
    hasPrefix: {
      control: { type: 'boolean' },
    },
    hasSuffix: {
      control: { type: 'boolean' },
    },
    spec: {
      control: false,
    },
    suffix: { control: false },
    prefix: { control: false },
    placeholder: { control: { type: 'text' } },
  },
}
export const Normal = Template.bind({})
Normal.args = {
  hasPrefix: false,
  hasSuffix: false,
  spec: '',
  type: 'text',
  value: '',
  placeholder: 'test',
}

export const WithSpec = Template.bind({})
WithSpec.args = {
  hasPrefix: false,
  hasSuffix: false,
  spec: '(__) ____-____',
  type: 'text',
}
