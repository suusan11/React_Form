import React from 'react';
import { Heading, Text, CheckBox, Box, Image, Grommet } from 'grommet';
import iconChecked from './assets/checked.png';

const CheckButtontheme = {
  text: {
    medium: {
      size: '16px',
      height: '20px',
    }
  },
  checkBox: {
    extend: () => {
      return `
        position: absolute;
        top: 0;
        left: 0;
        width: 192px;
        height: 72px;
      `
    },
    hover: {
      border: {
        color: 'transparent',
      }
    },
    check: {
      extend: () => {
        return `
          display: none;
        `
      }
    },
    icon: {
      size: '0px'
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
  }
};

//specific styles
const boxContainer = {
  width: '100%',
  height: 'auto',
  background: 'transparent',
}
const outerBox = {
  position: 'relative',
  width: '192px',
  height: '72px',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
  marginBottom: '8px',
}
const errorBox = {
  position: 'relative',
  width: '192px',
  height: '72px',
  border: '1px solid #E42748',
  borderRadius: '4px',
  marginBottom: '8px',
}
const errorMessage = {
  display: 'block',
  color: '#E42748',
  fontSize: '16px',
}

const MultipleSelect = props => {
  const errorIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 12H7.2V10.4H8.8V12ZM8.8 8.8H7.2V4H8.8V8.8Z" fill="#E42748" />
  </svg>

  const removeItemFromArray = (array, checkedValue) =>
    array.filter(arrayItem => arrayItem !== checkedValue); //update array except unchecked value
  const onCheckboxChange = checkedValue => ({ target }) => {
    if (target.checked) {
      const checkedValues = [...props.value, checkedValue];
      props.change(target.name, checkedValues); //pass target name and checked items to parent
    } else {
      const uncheckedValue = removeItemFromArray(props.value, checkedValue); //props.value = array of multipleSelect ex) qualities: []
      props.change(target.name, uncheckedValue); //pass target name and checked items to parent
    }
  };

  return (
    <>
      <Heading
        size='17px'
        lineHeight='24px'
        maxWidth='590px'
        margin={{
          top: '40px',
          bottom: '8px',
        }}
      >
        {props.heading}
        {props.anchor}
      </Heading>
      <Text size='14px' margin={{ bottom: '8px' }}>Select all that apply. </Text>
      {props.required === false ? <Text style={errorMessage}>{errorIcon}&ensp;Answer required</Text> : ''}
      <Grommet theme={CheckButtontheme}>
        <Box direction='row' justify='start' alignContent='end' wrap={true} margin={{ top: '8px' }} style={boxContainer}>

          {props.options.map(option => {
            const multipleValueArr = props.value; //props.value = array of multipleSelect ex) qualities: []
            let background;
            let border;
            let textColor;
            if (!multipleValueArr.includes(option)) {
              background = '#FFFFFF';
              border = '1px solid #CCCCCC';
              textColor = '#5D5D5D';
            } else {
              background = '#222222';
              border = 'none';
              textColor = '#FFFFFF';
            }
            return (
              <Box key={option} style={props.required === false ? errorBox : outerBox} background={background} border={{ border }} margin={{ right: '4px' }} pad={{ right: '24px', left: '24px' }}>
                <Image src={iconChecked} alignSelf='end' />
                <Text alignSelf='center' textAlign='center' margin={{ 'vertical': 'auto' }} color={textColor}>{option}</Text>
                <CheckBox
                  name={props.name}
                  key={option}
                  value={option}
                  checked={multipleValueArr.includes(option)}
                  onChange={onCheckboxChange(option)}
                  onClick={props.click}
                />
              </Box>
            );
          })
          }
        </Box>
      </Grommet>
    </>
  );

}

export default MultipleSelect;