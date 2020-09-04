import React from 'react';
import styled from 'styled-components';

export interface IModalProps {};

interface IModalStyleProps {};

const ModalStyle = styled.div<IModalStyleProps>``;

export const Modal: React.FC<IModalProps> = props => {
  return (
    <ModalStyle>
      <div />
    </ModalStyle>
  );
};
