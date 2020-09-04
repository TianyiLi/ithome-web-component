import React from 'react';
import { IModalProps, Modal } from './modal';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<IModalProps> = function(args) {
  return <Modal {...args} />
}

export default {
  title: 'Modal',
  component: Modal,
}

export const Normal = Template.bind({});
Normal.args = {};
