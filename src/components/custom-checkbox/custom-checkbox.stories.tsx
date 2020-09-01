import React from 'react';
import { ICustomCheckboxProps, CustomCheckbox } from './custom-checkbox';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<ICustomCheckboxProps> = function(args) {
  return <CustomCheckbox {...args} />
}

export default {
  title: 'CustomCheckbox',
  component: CustomCheckbox,
}

export const Normal = Template.bind({});
Normal.args = {};
