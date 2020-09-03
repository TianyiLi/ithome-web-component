import React from 'react';
import { ICarouselProps, Carousel } from './carousel';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<ICarouselProps> = function(args) {
  return <Carousel {...args} />
}

export default {
  title: 'Carousel',
  component: Carousel,
}

export const Normal = Template.bind({});
Normal.args = {};
