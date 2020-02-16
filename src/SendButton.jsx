import React from 'react';
import styled from 'styled-components';


const SubmitButton = styled.button.attrs(props => ({
  background: props.color || '#B783FC'
}))
  `
  display: block;
  width: 234px;
  height: 56px;
  margin: 0 auto;
  background: ${props => props.background};
  box-shadow: 0px 4px 16px rgba(209, 35, 157, 0.15);
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 1px;
  color: #FFFFFF;
  cursor: pointer;
`;

const Button = props => {
  return (
    <SubmitButton type={props.type} label={props.label} onClick={props.click}>SUBMIT</SubmitButton>
    // <SubmitButton color="background">SUBMIT</SubmitButton> color change
  );
}

export default Button;