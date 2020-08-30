import React from 'react';
import { Progressbar, ProgressbarProps } from './progressbar';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<ProgressbarProps> = (args) => {
  return <Progressbar {...args} />;
};

export default {
  title: 'Progressbar',
  component: Progressbar,
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
  },
};

export const Normal = Template.bind({});
Normal.args = {
  value: 20,
  max: 100,
  duration: 0.5,
};
