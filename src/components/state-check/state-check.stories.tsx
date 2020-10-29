import React from 'react'
import { IStateCheckProps, StateCheck } from './state-check'
import { Story } from '@storybook/react/types-6-0'

const Template: Story<IStateCheckProps> = function (args) {
  return <StateCheck {...args} />
}

export default {
  title: 'StateCheck',
  component: StateCheck,
  argTypes: {
    state: {
      control: { type: 'select', options: ['pending', 'error', 'check'] },
    },
    message: { }
  },
}

export const Normal = Template.bind({})
Normal.args = {
  state: 'pending',
}
