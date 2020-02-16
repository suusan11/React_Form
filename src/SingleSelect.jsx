import React from 'react';
import { Heading, RadioButtonGroup, Grommet, Box, Text, Image } from 'grommet';
import iconChecked from './assets/checked.png';

const RadioButtonTheme = {
  text: {
    medium: {
      size: '16px',
      height: '20px',
    }
  },
  radioButton: {
    hover: {
      border: {
        color: '#CCCCCC',
      }
    },
  },
  image: {
    extend: () => {
      return `
        position: absolute;
        top: 4px;
        right: 3.5px;
        width: 10px;
        height: 8px;
        z-index: 5;
      `
    }
  },
  global: {
    borderSize: '0px'
  }
};

//specific styles
const outerBox = {
  position: 'relative',
  height: '72px',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
}
const errorBox = {
  position: 'relative',
  height: '72px',
  border: '1px solid #E42748',
  borderRadius: '4px',
}
const removeBoxStyle = {
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
}
const errorMessage = {
  color: '#E42748',
  fontSize: '16px',
}

const SingleSelect = props => {
  const errorIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 12H7.2V10.4H8.8V12ZM8.8 8.8H7.2V4H8.8V8.8Z" fill="#E42748" />
  </svg>

  return (
    <>
      <Heading
        size='17px'
        lineHeight='24px'
        maxWidth='590px'
        margin={{
          top: '40px',
        }}
      >
        {props.heading}
      </Heading>
      {props.required === false ? <Text style={errorMessage}>{errorIcon}&ensp;Answer required</Text> : ''}
      <Grommet theme={RadioButtonTheme}>
        <RadioButtonGroup
          name={props.name}
          direction='row'
          justify='start'
          gap='0px'
          wrap={true}
          options={props.options}
          value={props.value}
          onChange={props.change}
          onClick={props.click}
          style={removeBoxStyle}
        >
          {(option, { checked }) => {
            const Label = option;
            let background;
            let textColor;

            if (checked) {
              background = '#222222';
              textColor = '#FFFFFF';
            }
            else {
              background = '#FFFFFF';
              textColor = '#5D5D5D';
            }
            return (
              <Box background={background} style={props.required === false ? errorBox : outerBox} margin={{ right: '4.6px', bottom: '8px' }} pad={props.padding} width={props.width} >
                <Image src={iconChecked} alignSelf='end' />
                <Text alignSelf='center' textAlign='center' margin={{ 'vertical': 'auto' }} color={textColor}>{Label}</Text>
              </Box>
            );
          }}
        </RadioButtonGroup>
      </Grommet>
    </>
  );
}

export default SingleSelect;