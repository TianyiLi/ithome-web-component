import React, { createContext } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

interface CustomRadioContext {
  name?: string;
}

const CustomRadioGroupContext = createContext<CustomRadioContext>({
  name: nanoid(),
});

export interface CustomRadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  radioStyle: {
    outerColor?: string;
    innerColor?: string;
  };
}

const CustomRadioStyle = styled.label<CustomRadioProps['radioStyle']>`
  display: inline-block;
  position: relative;

  .ty-custom-radio {
    appearance: none;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 5px;
    vertical-align: middle;
    background-color: ${(props) => props.innerColor || '#ffc445'};
    border: ${(props) => props.outerColor || '#f19149'} 2px solid;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 0;
  }
`;

export const CustomRadio = function ({
  children,
  radioStyle,
  ...props
}: React.PropsWithChildren<CustomRadioProps>) {
  const { name } = React.useContext(CustomRadioGroupContext);
  return (
    <CustomRadioStyle {...radioStyle}>
      <input {...props} name={name} type="radio" className="ty-custom-radio" />
      {children}
    </CustomRadioStyle>
  );
};

CustomRadio.Group = (({ name, children }) => {
  return (
    <CustomRadioGroupContext.Provider value={{ name: name || nanoid() }}>
      {children}
    </CustomRadioGroupContext.Provider>
  );
}) as React.FC<{ name: string }>;
