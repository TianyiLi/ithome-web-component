import React from 'react';
import styled from 'styled-components';

export interface ICustomCheckboxProps {}

interface ICustomCheckboxStyleProps {}

const CustomCheckboxStyle = styled.label<ICustomCheckboxStyleProps>``;

export const CustomCheckbox: React.FC<ICustomCheckboxProps> = ({
  children,
  ...props
}) => {
  return <CustomCheckboxStyle>
    <span></span>
    {children}</CustomCheckboxStyle>;
};
