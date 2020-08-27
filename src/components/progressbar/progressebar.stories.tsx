import React from 'react'
import { Progressbar, ProgressbarProps } from './progressbar'
import { Story } from '@storybook/react/types-6-0'

const Template: Story<DestructFC<ProgressbarProps>> = (args) => {
  return <Progressbar {...args} />
}

export default {
  title: 'Progressbar',
  component: Progressbar,
  argTypes: {
    value: { control: 'number' },
  },
}

export const Normal = Template.bind({})
